import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransaccionService {
  constructor(private prisma: PrismaService) {}

  async retiro(clienteId: number, monto: number, cajeroId: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: clienteId },
      include: { cuentas: true },
    });

    if (!cliente) {
      throw new BadRequestException('Cliente no encontrado');
    }

    const cuenta = cliente.cuentas[0]; // asumimos que tiene 1 cuenta
    if (!cuenta || cuenta.saldo < monto) {
      throw new BadRequestException('Saldo insuficiente');
    }

    const cajero = await this.prisma.cajero.findUnique({
      where: { id: cajeroId },
    });

    if (!cajero || cajero.efectivoDisponible < monto) {
      throw new BadRequestException('Cajero sin suficiente efectivo');
    }

    // Actualizamos saldo de cuenta
    await this.prisma.cuenta.update({
      where: { id: cuenta.id },
      data: { saldo: cuenta.saldo - monto },
    });

    // Actualizamos efectivo de cajero
    await this.prisma.cajero.update({
      where: { id: cajero.id },
      data: { efectivoDisponible: cajero.efectivoDisponible - monto },
    });

    // Creamos la transacción
    await this.prisma.transaccion.create({
      data: {
        monto,
        saldoResultante: cuenta.saldo - monto,
        estado: 'completada',
        cuentaId: cuenta.id,
        cajeroId,
        tipoTransaccionId: 1, // Asumimos ID 1 = Retiro
        clienteId,
      },
    });

    return {
      message: 'Retiro exitoso',
      saldoActual: cuenta.saldo - monto,
    };
  }
}

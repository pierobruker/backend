import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CuentasService } from '../cuentas/cuentas.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private cuentasService: CuentasService
  ) {}

  async retirar(cuentaId: number, monto: number, cajeroId?: number) {
    // 1. Verificar cuenta
    const cuenta = await this.cuentasService.buscarPorId(cuentaId);
    if (!cuenta) {
      throw new Error('Cuenta no encontrada');
    }

    // 2. Verificar saldo
    if (cuenta.saldo < monto) {
      throw new Error('Saldo insuficiente');
    }

    // 3. Actualizar saldo
    const nuevoSaldo = cuenta.saldo - monto;
    await this.prisma.mAE_CUENTA.update({
      where: { id: cuentaId },
      data: { saldo: nuevoSaldo }
    });

    // 4. Registrar transacción
    return this.prisma.tRS_TRANSACCION.create({
      data: {
        cuentaId,
        cajeroId,
        monto,
        tipo: 'RETIRO',
        saldoResultante: nuevoSaldo,
        estado: 'COMPLETADA'
      }
    });
  }
}
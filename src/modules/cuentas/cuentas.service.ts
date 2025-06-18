import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CuentaService {
  constructor(private prisma: PrismaService) {}

  async consultarSaldo(clienteId: number) {
    const cuenta = await this.prisma.cuenta.findFirst({
      where: { clienteId },
    });

    if (!cuenta) {
      return { message: 'Cuenta no encontrada' };
    }

    return {
      saldo: cuenta.saldo,
      tipoMoneda: cuenta.tipoMoneda,
    };
  }
}

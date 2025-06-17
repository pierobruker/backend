import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { MAE_CUENTA } from '@prisma/client';

@Injectable()
export class CuentasService {
  constructor(private prisma: PrismaService) {}

  async crearCuenta(data: {
    numeroCuenta: string;
    tipoMoneda: string;
    clienteId: number;
  }): Promise<MAE_CUENTA> {
    return this.prisma.mAE_CUENTA.create({
      data: {
        ...data,
        saldo: 0,
        estado: 'ACTIVA'
      }
    });
  }

  async buscarPorCliente(clienteId: number): Promise<MAE_CUENTA[]> {
    return this.prisma.mAE_CUENTA.findMany({
      where: { clienteId }
    });
  }
  // En cuentas.service.ts
async buscarPorId(id: number) {
  return this.prisma.mAE_CUENTA.findUnique({
    where: { id }
  });
}
}
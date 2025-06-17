import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { MAE_CLIENTE } from '@prisma/client';

@Injectable()
export class ClientesService {  // ← Asegúrate que el nombre coincida exactamente
  constructor(private prisma: PrismaService) {}

  async buscarPorDNI(dni: string): Promise<MAE_CLIENTE | null> {
    return this.prisma.mAE_CLIENTE.findUnique({ where: { dni } });
  }
}
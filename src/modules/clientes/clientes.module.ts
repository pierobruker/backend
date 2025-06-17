import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [ClientesService, PrismaService],
  exports: [ClientesService]  // ← Exporta el servicio
})
export class ClientesModule {}
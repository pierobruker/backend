import { Module } from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { CuentasController } from './cuentas.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [CuentasController],
  providers: [CuentasService, PrismaService],
  exports: [CuentasService] // Importante para inyección en otros módulos
})
export class CuentasModule {}
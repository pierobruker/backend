import { Module } from '@nestjs/common';
import { CuentaService } from './cuentas.service';
import { CuentaController } from '../cuenta.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [CuentaController],
  providers: [CuentaService, PrismaService],
  exports: [CuentaService] // Importante para inyección en otros módulos
})
export class CuentaModule {}
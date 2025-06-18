import { Module } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { TransaccionController } from './transaccion.controller';


import { PrismaService } from '../../prisma.service';
import { CuentaModule } from '../cuentas/cuentas.module';


@Module({
  imports: [CuentaModule], // Necesario para usar CuentasService
  controllers: [TransaccionController],
  providers: [TransaccionService, PrismaService]
})
export class TransaccionModule {}



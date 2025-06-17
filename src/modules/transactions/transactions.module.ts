import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';


import { PrismaService } from '../../prisma.service';
import { CuentasModule } from '../cuentas/cuentas.module';


@Module({
  imports: [CuentasModule], // Necesario para usar CuentasService
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService]
})
export class TransactionsModule {}
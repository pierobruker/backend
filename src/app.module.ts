// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CuentasModule } from './modules/cuentas/cuentas.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TransactionsModule,
    CuentasModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
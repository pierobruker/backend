// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionsModule } from './modules/transaccion/transaccion.module';
import { CuentasModule } from './modules/cuentas/cuentas.module';
import { TransaccionModule } from './modules/transaccion/transaccion.module';
import { ClientesModule } from './modules/clientes/clientes.module';


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






@Module({
  imports: [CuentasModule, TransaccionModule, AuthModule, ClientesModule],
  providers: [PrismaService],
})
export class AppModule {}



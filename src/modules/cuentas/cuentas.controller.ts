import { Controller, Get, Query } from '@nestjs/common';
import { CuentaService } from './cuentas.service';

@Controller('cuenta')
export class CuentaController {
  constructor(private readonly cuentasService: CuentaService) {}

  @Get('saldo')
  async saldo(@Query('clienteId') clienteId: string) {
    return this.cuentasService.consultarSaldo(Number(clienteId));
  }
}

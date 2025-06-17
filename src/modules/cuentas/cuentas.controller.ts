import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CuentasService } from './cuentas.service';

@Controller('cuentas')
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @Post()
  crear(@Body() data: Parameters<CuentasService['crearCuenta']>[0]) {
    return this.cuentasService.crearCuenta(data);
  }

  @Get('cliente/:clienteId')
  porCliente(@Param('clienteId') clienteId: string) {
    return this.cuentasService.buscarPorCliente(parseInt(clienteId));
  }
}
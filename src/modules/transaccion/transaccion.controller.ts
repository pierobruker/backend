// src/transaccion/transaccion.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';

@Controller('transaccion')
export class TransaccionController {
  constructor(private transaccionService: TransaccionService) {}

  @Post('retiro')
  async retiro(@Body() body: { clienteId: number; monto: number; cajeroId: number }) {
    return this.transaccionService.retiro(body.clienteId, body.monto, body.cajeroId);
  }
}

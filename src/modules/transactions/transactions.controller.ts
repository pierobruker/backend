import { Body, Controller, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('retirar')
  async retirar(@Body() body: { 
    cuentaId: number; 
    monto: number;
    cajeroId?: number 
  }) {
    return this.transactionsService.retirar(
      body.cuentaId, 
      body.monto, 
      body.cajeroId
    );
  }
}
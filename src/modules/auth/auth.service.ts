import { Injectable } from '@nestjs/common';
import { ClientesService } from '../clientes/clientes.service';

@Injectable()
export class AuthService {
  constructor(private clientesService: ClientesService) {} // Actualizado

  async validarCliente(dni: string, pin: string) {
    const cliente = await this.clientesService.buscarPorDNI(dni);
    // ... resto de la lógica
  }
}
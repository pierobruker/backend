import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validarPin(tarjeta: string, pin: string) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { tarjeta },
    });

    if (!cliente) {
      throw new UnauthorizedException('Tarjeta no encontrada');
    }

    const pinValido = await bcrypt.compare(pin, cliente.pinHash);
    if (!pinValido) {
      throw new UnauthorizedException('PIN inválido');
    }

    return {
      message: 'Autenticación exitosa',
      clienteId: cliente.id,
      nombre: cliente.nombre,
    };
  }
}

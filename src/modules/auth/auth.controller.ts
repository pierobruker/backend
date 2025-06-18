import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { tarjeta: string; pin: string }) {
    return this.authService.validarPin(body.tarjeta, body.pin);
  }
}

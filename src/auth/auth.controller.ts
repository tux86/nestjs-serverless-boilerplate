import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  @Get()
  @UseGuards(JwtAuthGuard)
  checkAuth(): any {
    return { status: 'auth success' };
  }
}

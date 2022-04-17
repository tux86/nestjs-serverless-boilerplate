import { Controller, Get, UseGuards } from '@nestjs/common';
import { CognitoAuthGuard } from './cognito.guard';

@Controller('auth')
export class AuthController {
  @Get()
  @UseGuards(CognitoAuthGuard)
  checkAuth(): any {
    return { status: 'auth success' };
  }
}

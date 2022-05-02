import { Body, Controller, Post } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { AuthParams } from './dtos/auth-params.dto';

@Controller('aws/cognito')
export class CognitoController {
  constructor(private cognitoService: CognitoService) {}

  @Post('auth')
  async auth(@Body() params: AuthParams): Promise<any> {
    try {
      return await this.cognitoService.auth(params.username, params.password);
    } catch (error) {
      return error;
    }
  }
}

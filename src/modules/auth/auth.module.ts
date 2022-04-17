import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CognitoAuthGuard } from './cognito.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [],
  providers: [JwtStrategy, CognitoAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}

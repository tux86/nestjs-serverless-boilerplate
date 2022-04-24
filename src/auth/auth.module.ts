import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [],
  providers: [JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}

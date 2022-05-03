import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserGraphqlModules } from './graphql';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), ...UserGraphqlModules],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

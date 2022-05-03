import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';

@Module({
  imports: [],
  providers: [UserResolver],
  exports: [],
})
export class UserGraphqlPublicModule {}

import { Module } from '@nestjs/common';
import { UserModule } from '../../../user/user.module';
import { UserPublicResolver } from '../../../user/resolvers/user.public.resolver';

@Module({
  imports: [UserModule],
  providers: [UserPublicResolver],
})
export class UserPublicResolverModule {}

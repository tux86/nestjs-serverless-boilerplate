import { Module } from '@nestjs/common';
import { UserPublicResolver } from '../../../app/user/resolvers/user.public.resolver';
import { CatPublicResolver } from '../../../app/cat/resolvers/cat.public.resolver';

@Module({
  providers: [UserPublicResolver, CatPublicResolver],
})
export class PublicResolversModule {}

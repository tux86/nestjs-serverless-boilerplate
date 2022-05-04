import { Module } from '@nestjs/common';
import { UserManagementResolver } from '../../../app/user/resolvers/user.management.resolver';
import { CatManagementResolver } from '../../../app/cat/resolvers/cat.management.resolver';

@Module({
  providers: [UserManagementResolver, CatManagementResolver],
})
export class ManagementResolversModule {}

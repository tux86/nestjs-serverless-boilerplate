import { Module } from '@nestjs/common';
import { UserModule } from '../../../user/user.module';
import { UserManagementResolver } from '../../../user/resolvers/user.management.resolver';

@Module({
  imports: [UserModule],
  providers: [UserManagementResolver],
})
export class UserManagementResolverModule {}

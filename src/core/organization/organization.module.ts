import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationService } from './organization.service';
import { Organization } from './organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}

import { ObjectType } from '@nestjs/graphql';
import { PaginationTypeOf } from '@/shared/utils/pagination/types/pagination';
import { Organization } from '@/core/organization/organization.entity';

@ObjectType()
export class OrganizationsPagination extends PaginationTypeOf(Organization) {}

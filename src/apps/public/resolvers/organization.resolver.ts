import { Query, Resolver } from '@nestjs/graphql';

import { Organization } from '@/core/organization/organization.entity';
import { OrganizationService } from '@/core/organization/organization.service';

@Resolver((of) => Organization)
export class OrganizationResolver {
  constructor(private readonly service: OrganizationService) {}

  @Query(() => Organization)
  async currentOrganization(): Promise<Organization> {
    return this.service.findById('MP9212');
  }
}

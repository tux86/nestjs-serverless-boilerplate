import { Query, Resolver } from '@nestjs/graphql';

import { Organization } from '../../../core/organization/organization.entity';
import { OrganizationService } from '../../../core/organization/organization.service';

@Resolver((of) => Organization)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Query(() => Organization)
  async currentOrganization(): Promise<Organization> {
    return this.organizationService.findById('MP9212');
  }
}

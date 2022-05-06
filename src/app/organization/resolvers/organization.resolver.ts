import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Organization } from '../organization.entity';
import { CreateOrganizationInput } from '../dtos/create-organization.input';
import { OrganizationService } from '../organization.service';

import { UpdateOrganizationInput } from '../dtos/update-organization.input';

@Resolver((of) => Organization)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Query(() => [Organization])
  async organizations(): Promise<Organization[]> {
    return this.organizationService.find();
  }

  @Query(() => Organization)
  async organization(
    @Args('orgId') orgId: string,
  ): Promise<Organization | undefined | never> {
    return this.organizationService.findById(orgId);
  }

  @Mutation(() => Organization)
  async createOrganization(
    @Args('input') input: CreateOrganizationInput,
  ): Promise<Organization | never> {
    return await this.organizationService.create(input);
  }

  @Mutation(() => Organization)
  async updateOrganization(
    @Args('input') input: UpdateOrganizationInput,
  ): Promise<Organization | never> {
    return await this.organizationService.update(input);
  }

  @Mutation(() => Boolean)
  async deleteOrganization(
    @Args('orgId') orgId: string,
  ): Promise<boolean | never> {
    return await this.organizationService.remove(orgId);
  }
}

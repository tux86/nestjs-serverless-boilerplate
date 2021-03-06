import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Organization } from '@/core/organization/organization.entity';
import { CreateOrganizationDto } from '@/core/organization/dtos/create-organization.dto';
import { OrganizationService } from '@/core/organization/organization.service';
import { UpdateOrganizationDto } from '@/core/organization/dtos/update-organization.dto';
import { GetOrganizationDto } from '@/core/organization/dtos/get-organization.dto';
import { DeleteOrganizationDto } from '@/core/organization/dtos/delete-organization.dto';
import { QueryListArgs } from '@/shared/dtos/query-list.args';
import { OrganizationsPagination } from '@/core/organization/dtos/organizations-pagination';
import { OrganizationNotFoundException } from '@/core/organization/exceptions/organization-not-found.exception';

@Resolver((of) => Organization)
export class OrganizationResolver {
  constructor(private readonly service: OrganizationService) {}

  @Query(() => OrganizationsPagination)
  async organizations(
    @Args() args: QueryListArgs,
  ): Promise<OrganizationsPagination | never> {
    return await this.service.findAll(args);
  }
  @Query(() => Organization)
  async organization(
    @Args() args: GetOrganizationDto,
  ): Promise<Organization | undefined | never> {
    return this.service.findById(args.orgId);
  }

  @Mutation(() => Organization)
  async createOrganization(
    @Args('input') input: CreateOrganizationDto,
  ): Promise<Organization | never> {
    return await this.service.create(input);
  }

  @Mutation(() => Organization)
  async updateOrganization(
    @Args('input') input: UpdateOrganizationDto,
  ): Promise<Organization | never> {
    return await this.service.update(input);
  }

  @Mutation(() => Boolean)
  async deleteOrganization(
    @Args() args: DeleteOrganizationDto,
  ): Promise<boolean | never> {
    return await this.service.remove(args.orgId);
  }
}

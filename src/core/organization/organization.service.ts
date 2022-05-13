import { Injectable, Logger } from '@nestjs/common';
import { Organization } from './organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { Repository } from 'typeorm';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';

import {
  ResourceAlreadyExistsException,
  ResourceNotExistsException,
} from '@/shared/exceptions';
import { OrganizationNotFoundException } from '@/core/organization/exceptions/organization-not-found.exception';

@Injectable()
export class OrganizationService {
  private logger = new Logger(OrganizationService.name);

  constructor(
    @InjectRepository(Organization)
    private repository: Repository<Organization>,
  ) {}

  public async find(): Promise<Organization[]> {
    return this.repository.find({
      where: {},
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public async findById(
    orgId: string,
  ): Promise<Organization | undefined | never> {
    const organization = await this.repository.findOne({
      where: {
        orgId,
      },
    });
    if (!organization) {
      throw new ResourceNotExistsException(Organization, orgId);
    }
    return organization;
  }

  public async create(
    createOrganizationInput: CreateOrganizationDto,
  ): Promise<Organization | never> {
    const { orgId } = createOrganizationInput;
    const existingOrganization = await this.repository.findOne({
      where: {
        orgId,
      },
    });
    if (existingOrganization) {
      throw new ResourceAlreadyExistsException(
        Organization,
        existingOrganization.orgId,
      );
    }
    const organization = this.repository.create(createOrganizationInput);
    return await this.repository.save(organization);
  }

  public async update(
    updateOrganizationInput: UpdateOrganizationDto,
  ): Promise<Organization | never> {
    const { orgId } = updateOrganizationInput;
    const organization = await this.repository.preload(updateOrganizationInput);
    if (!organization) {
      throw new OrganizationNotFoundException(orgId);
    }
    return await this.repository.save(organization);
  }

  public async remove(orgId: string): Promise<boolean | never> {
    const organization = await this.findById(orgId);
    await this.repository.softRemove(organization);
    return true;
  }
}

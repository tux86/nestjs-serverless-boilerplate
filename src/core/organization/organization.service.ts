import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Organization } from './organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganizationInput } from './dtos/create-organization.input';
import { Repository } from 'typeorm';
import { UpdateOrganizationInput } from './dtos/update-organization.input';
import { OrganizationNotFoundException } from './exceptions/organization-not-found.exception';

@Injectable()
export class OrganizationService {
  private logger = new Logger(OrganizationService.name);

  constructor(
    @InjectRepository(Organization)
    private repository: Repository<Organization>,
  ) {}

  public async find(): Promise<Organization[]> {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public async findById(orgId: string): Promise<Organization | undefined> {
    return this.repository.findOne({
      where: {
        orgId,
      },
    });
  }

  public async create(
    createOrganizationInput: CreateOrganizationInput,
  ): Promise<Organization | never> {
    const { orgId } = createOrganizationInput;
    const existingOrganization = await this.repository.findOne({
      where: {
        orgId,
      },
    });
    if (existingOrganization) {
      throw new ConflictException('Already existing organization');
    }
    const organization = this.repository.create(createOrganizationInput);
    return await this.repository.save(organization);
  }

  public async update(
    updateOrganizationInput: UpdateOrganizationInput,
  ): Promise<Organization | never> {
    const { orgId } = updateOrganizationInput;
    const organization = await this.repository.preload(updateOrganizationInput);
    if (!organization) {
      throw new OrganizationNotFoundException(orgId);
    }
    return await this.repository.save(organization);
  }

  public async remove(orgId: string): Promise<boolean | never> {
    try {
      const organization = await this.repository.findOneOrFail({
        where: {
          orgId,
        },
      });
      await this.repository.softRemove(organization);
      return true;
    } catch (error) {
      this.logger.error([error.message, error.stack].join('\n'));
      return false;
    }
  }
}

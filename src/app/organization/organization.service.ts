import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from './organization.repository';
import { Organization } from './organization.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationRepository)
    private repository: OrganizationRepository,
  ) {}

  public async findById(orgId: string): Promise<Organization | undefined> {
    return await this.repository.findOne({
      where: {
        orgId,
      },
    });
  }
}

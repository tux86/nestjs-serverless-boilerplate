import { Injectable, Logger } from '@nestjs/common';
import { Parameter } from '../entities/parameter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParameterInput } from '../dtos/input/create-parameter.input';
import {
  ResourceAlreadyExistsException,
  ResourceNotExistsException,
} from '@/shared/exceptions';
import { UpdateParameterInput } from '../dtos/input/update-parameter.input';
import { paginate } from 'nestjs-typeorm-paginate';
import { QueryListArgs } from '@/shared/dtos/query-list.args';
import { searchQueryBuilder } from '@/shared/utils/search/seach-query.builder';
import { filterQueryBuilder } from '@/shared/utils/filter/builder/filter-query.builder';
import { sortQueryBuilder } from '@/shared/utils/sort/sort';
import { ParametersPagination } from '@/core/parameter/dtos/types/parameters-pagination';

@Injectable()
export class ParameterService {
  private logger = new Logger(ParameterService.name);

  constructor(
    @InjectRepository(Parameter)
    private repository: Repository<Parameter>,
  ) {}

  async findAll({
    page,
    limit,
    search,
    filters,
    sort,
  }: QueryListArgs): Promise<ParametersPagination> {
    const qb = this.repository.createQueryBuilder('Parameter');
    searchQueryBuilder(qb, ['Parameter.name', 'Parameter.description'], search);
    filterQueryBuilder(qb, filters);
    sortQueryBuilder(qb, sort);
    return await paginate<Parameter>(qb, { page, limit });
  }

  public async findById(
    parameterId: string,
  ): Promise<Parameter | undefined | never> {
    const parameter = await this.repository.findOne({
      where: {
        parameterId,
      },
    });
    if (!parameter) {
      throw new ResourceNotExistsException(Parameter, parameterId);
    }
    return parameter;
  }

  public async findByName(
    name: string,
  ): Promise<Parameter | undefined | never> {
    return await this.repository.findOne({
      name,
    });
  }

  public async create(input: CreateParameterInput): Promise<Parameter | never> {
    const { name } = input;
    const existingParameter = await this.findByName(name);
    if (existingParameter) {
      throw new ResourceAlreadyExistsException(
        Parameter,
        existingParameter.parameterId,
      );
    }
    const parameter = this.repository.create(input);
    return await this.repository.save(parameter);
  }

  public async update(input: UpdateParameterInput): Promise<Parameter | never> {
    const parameter = await this.repository.preload(input);
    if (!parameter) {
      throw new ResourceNotExistsException(Parameter, parameter.parameterId);
    }
    return await this.repository.save(parameter);
  }

  public async remove(parameterId: string): Promise<boolean | never> {
    const parameter = await this.findById(parameterId);
    await this.repository.softRemove(parameter);
    return true;
  }
}

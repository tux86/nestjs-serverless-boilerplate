import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParameterValue } from '../entities/parameter-value.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { QueryListArgs } from '@/shared/dtos/query-list.args';
import { filterQueryBuilder } from '@/shared/utils/filter/builder/filter-query.builder';
import { ParameterValuesPagination } from '../dtos/types/parameter-values-pagination';
import { sortQueryBuilder } from '@/shared/utils/sort/sort';
import { searchQueryBuilder } from '@/shared/utils/search/seach-query.builder';

@Injectable()
export class ParameterValueService {
  private logger = new Logger(ParameterValueService.name);

  constructor(
    @InjectRepository(ParameterValue)
    private repository: Repository<ParameterValue>,
  ) {}

  async findAll({
    page,
    limit,
    search,
    filters,
    sort,
  }: QueryListArgs): Promise<ParameterValuesPagination> {
    const qb = this.repository.createQueryBuilder('ParameterValue');
    qb.leftJoinAndSelect('ParameterValue.parameter', 'Parameter');

    searchQueryBuilder(qb, ['ParameterValue.value'], search);
    filterQueryBuilder(qb, filters);
    sortQueryBuilder(qb, sort);
    return await paginate<ParameterValue>(qb, { page, limit });
  }

  // public find() {}
  // public findById() {}
  // public findByName() {}
  // public create() {}
  // public update() {}
  // public remove() {}
}

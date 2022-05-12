import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParameterValue } from '../entities/parameter-value.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationQueryInput } from '../../../shared/dtos/pagination-query.input';
import { filterQueryBuilder } from '../../../shared/utils/filter/builder/filter-query.builder';
import { ParameterValuesPagination } from '../dtos/types/parameter-values-paginated';
import { defaultPaginationOptions } from '../../../shared/utils/pagination';

@Injectable()
export class ParameterValueService {
  private logger = new Logger(ParameterValueService.name);

  constructor(
    @InjectRepository(ParameterValue)
    private repository: Repository<ParameterValue>,
  ) {}

  async findAll(
    input?: PaginationQueryInput,
  ): Promise<ParameterValuesPagination> {
    const { pagination, filters, sort, search } = input;

    const qb = this.repository.createQueryBuilder('ParameterValue');
    filterQueryBuilder(qb, filters);
    qb.andWhere('ParameterValue.orgId = :orgId', { orgId: 'MP92' });
    qb.leftJoinAndSelect('ParameterValue.parameter', 'Parameter');

    return await paginate<ParameterValue>(
      qb,
      pagination || defaultPaginationOptions,
    );

    // console.log(JSON.stringify(result, null, 2));

    // const result = await qb.getMany();

    // return paginate<Parameter>(this.repository, options, {
    //   order: {
    //     createdAt: options.order,
    //   },
    //   where: {
    //     name: Raw(
    //       (alias) => `LOWER(${alias}) Like '%${options.search.toLowerCase()}%'`,
    //     ),
    //   },
    // });
  }

  // public find() {}
  // public findById() {}
  // public findByName() {}
  // public create() {}
  // public update() {}
  // public remove() {}
}

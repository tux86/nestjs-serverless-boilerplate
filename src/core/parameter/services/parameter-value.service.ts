import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParameterValue } from '../entities/parameter-value.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationQueryInput } from '../../../shared/dtos/pagination-query.input';
import { filterQueryBuilder } from '../../../shared/utils/filter/builder/filter-query.builder';
import { ParameterValuesPagination } from '../dtos/types/parameter-values-paginated';
import { defaultPaginationOptions } from '../../../shared/utils/pagination';
import { sortQueryBuilder } from '../../../shared/utils/sort/sort';
import { SortBy } from '../../../shared/utils/sort/dtos/sort-by.dto';
import { Raw } from 'typeorm/browser';

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

    // qb.andWhere('ParameterValue.orgId = :orgId', { orgId: 'MP92' });
    qb.leftJoinAndSelect('ParameterValue.parameter', 'Parameter');

    if (search) {
      qb.where(
        'LOWER(unaccent(ParameterValue.value)) ILIKE LOWER(unaccent(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    //filter
    filterQueryBuilder(qb, filters);

    // sort
    const defaultSortBy = new SortBy('parameterValueId');
    sortQueryBuilder(qb, sort || [defaultSortBy]);

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

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ParameterValue } from '../entities/parameter-value.entity';
import {
  FiltersExpression,
  Operator,
  LogicalOperator,
} from '../../../shared/utils/filter';
import FilterQueryBuilder from '../../../shared/utils/filter/filter-query-builder';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ParameterValueService {
  private logger = new Logger(ParameterValueService.name);

  constructor(
    @InjectRepository(ParameterValue)
    private repository: Repository<ParameterValue>,
  ) {}

  async paginate(): Promise<Pagination<ParameterValue>> {
    const filters: FiltersExpression = {
      op: LogicalOperator.And,
      filters: [
        {
          attribute: 'value',
          op: Operator.Eq,
          values: ['Africa/Tunis'],
        },
        {
          attribute: 'name',
          relationField: 'ParameterValue.parameter',
          op: Operator.ILike,
          values: ['TimeZone'],
        },
        // {
        //   field: 'Organization.value',
        //   op: Operation.EQ,
        //   values: ['MP92'],
        // },
      ],
      // childExpressions: [
      //   {
      //     operator: Operator.AND,
      //     filters: [
      //       {
      //         field: 'Parameter.name',
      //         relationField: 'ParameterValue.parameter',
      //         op: Operation.EQ,
      //         values: ['TimeZone'],
      //       },
      //     ],
      //   },
      // ],
    };

    console.log('filters', filters);

    const fqb = new FilterQueryBuilder<ParameterValue>(
      this.repository,
      filters,
    );

    const qb: SelectQueryBuilder<ParameterValue> = fqb.build();

    const options: IPaginationOptions = {
      limit: 10,
      page: 1,
    };
    // console.log(qb.getSql());
    const result = await paginate<ParameterValue>(qb, options);

    //  console.log(JSON.stringify(result, null, 2));

    // const result = await qb.getMany();

    return result;
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

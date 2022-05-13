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
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ParameterService {
  private logger = new Logger(ParameterService.name);

  constructor(
    @InjectRepository(Parameter)
    private repository: Repository<Parameter>,
  ) {}

  async paginate(): Promise<Pagination<Parameter>> {
    return null;
    // const filters: FiltersExpression = {
    //   operator: Operator.AND,
    //   filters: [
    //     {
    //       field: 'name',
    //       op: Operation.EQ,
    //       values: ['TimeZone'],
    //     },
    //     {
    //       field: 'createdAt',
    //       op: Operation.GE,
    //       values: ['2021-05-10 17:59:55'],
    //     },
    //     {
    //       field: 'shared',
    //       op: Operation.EQ,
    //       values: ['true'],
    //     },
    //   ],
    // };
    //
    // console.log('filters', filters);
    //
    // const fqb = new FilterQueryBuilder<Parameter>(this.repository, filters);
    //
    // const qb: SelectQueryBuilder<Parameter> = fqb.build();
    //
    // console.log(qb.getSql());
    // const result = await qb.getMany();
    //
    // console.log(JSON.stringify(result, null, 2));
    // return null;
    // // return paginate<Parameter>(this.repository, options, {
    // //   order: {
    // //     createdAt: options.order,
    // //   },
    // //   where: {
    // //     name: Raw(
    // //       (alias) => `LOWER(${alias}) Like '%${options.search.toLowerCase()}%'`,
    // //     ),
    // //   },
    // // });
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

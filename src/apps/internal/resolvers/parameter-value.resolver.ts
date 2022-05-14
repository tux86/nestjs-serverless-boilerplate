import { Args, Query, Resolver } from '@nestjs/graphql';
import { ParameterValue } from '@/core/parameter/entities/parameter-value.entity';
import { ParameterValueService } from '@/core/parameter/services/parameter-value.service';
import { ParameterValuesPagination } from '@/core/parameter/dtos/types/parameter-values-pagination';
import { QueryListArgs } from '@/shared/dtos/query-list.args';

@Resolver((of) => ParameterValue)
export class ParameterValueResolver {
  constructor(private readonly service: ParameterValueService) {}

  @Query(() => ParameterValuesPagination)
  async parameterValues(
    @Args() args: QueryListArgs,
  ): Promise<ParameterValuesPagination | never> {
    return await this.service.findAll(args);
  }
}

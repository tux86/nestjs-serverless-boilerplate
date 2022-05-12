import { Args, Query, Resolver } from '@nestjs/graphql';
import { ParameterValue } from '../../../core/parameter/entities/parameter-value.entity';
import { ParameterValueService } from '../../../core/parameter/services/parameter-value.service';
import { ParameterValuesPagination } from '../../../core/parameter/dtos/types/parameter-values-paginated';
import { PaginationQueryInput } from '../../../shared/dtos/pagination-query.input';

@Resolver((of) => ParameterValue)
export class ParameterValueResolver {
  constructor(private readonly service: ParameterValueService) {}

  @Query(() => ParameterValuesPagination)
  async parameterValues(
    @Args('input') input: PaginationQueryInput,
  ): Promise<ParameterValuesPagination | never> {
    return await this.service.findAll(input);
  }
}

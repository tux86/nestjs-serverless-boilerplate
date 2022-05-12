import { Query, Resolver } from '@nestjs/graphql';
import { ParameterValue } from '../../../core/parameter/entities/parameter-value.entity';
import { ParameterValueService } from '../../../core/parameter/services/parameter-value.service';
import { ParameterValuesPagination } from '../../../core/parameter/dtos/types/parameter-values-paginated';

@Resolver((of) => ParameterValue)
export class ParameterValueResolver {
  constructor(private readonly service: ParameterValueService) {}

  @Query(() => ParameterValuesPagination)
  async parameterValues(): Promise<ParameterValuesPagination | never> {
    const result = await this.service.paginate();

    console.log(JSON.stringify(result, null, 2));

    return result;
  }
}

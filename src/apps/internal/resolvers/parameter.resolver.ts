import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateParameterInput } from '../../../core/parameter/dtos/create-parameter.input';
import { Parameter } from '../../../core/parameter/entities/parameter.entity';
import { ParameterService } from '../../../core/parameter/services/parameter.service';

@Resolver((of) => Parameter)
export class ParameterResolver {
  constructor(private readonly service: ParameterService) {}

  @Mutation(() => Parameter)
  async createParameter(
    @Args('input') input: CreateParameterInput,
  ): Promise<Parameter | never> {
    return await this.service.create(input);
  }
}

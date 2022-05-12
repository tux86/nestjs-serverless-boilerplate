import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateParameterInput } from '../../../core/parameter/dtos/input/create-parameter.input';
import { Parameter } from '../../../core/parameter/entities/parameter.entity';
import { ParameterService } from '../../../core/parameter/services/parameter.service';
import { UpdateParameterInput } from '../../../core/parameter/dtos/input/update-parameter.input';
import { GetParameterArgs } from '../../../core/parameter/dtos/args/get-parameter.args';
import { DeleteParameterArgs } from '../../../core/parameter/dtos/args/delete-parameter.args';
import { ParametersPagination } from '../../../core/parameter/dtos/types/parameters-pagination';
import { GetParametersArgs } from '../../../core/parameter/dtos/args/get-parameters.args';
import { Pagination } from 'nestjs-typeorm-paginate';

@Resolver((of) => Parameter)
export class ParameterResolver {
  constructor(private readonly service: ParameterService) {}

  @Query(() => ParametersPagination)
  async parameters(
    @Args() args: GetParametersArgs,
  ): Promise<Pagination<Parameter> | never> {
    console.log(args);

    return await this.service.paginate();
  }

  @Query(() => Parameter)
  async parameter(@Args() args: GetParameterArgs): Promise<Parameter | never> {
    return await this.service.findById(args.parameterId);
  }

  @Mutation(() => Parameter)
  async createParameter(
    @Args('input') input: CreateParameterInput,
  ): Promise<Parameter | never> {
    return await this.service.create(input);
  }

  @Mutation(() => Parameter)
  async updateParameter(
    @Args('input') input: UpdateParameterInput,
  ): Promise<Parameter | never> {
    return await this.service.update(input);
  }

  @Mutation(() => Boolean)
  async deleteParameter(
    @Args() args: DeleteParameterArgs,
  ): Promise<boolean | never> {
    return await this.service.remove(args.parameterId);
  }
}

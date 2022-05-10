import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateParameterDto } from '../../../core/parameter/dtos/create-parameter.dto';
import { Parameter } from '../../../core/parameter/entities/parameter.entity';
import { ParameterService } from '../../../core/parameter/services/parameter.service';
import { UpdateParameterDto } from '../../../core/parameter/dtos/update-parameter.dto';
import { GetParameterDto } from '../../../core/parameter/dtos/get-parameter.dto';
import { DeleteParameterDto } from '../../../core/parameter/dtos/delete-parameter.dto';

@Resolver((of) => Parameter)
export class ParameterResolver {
  constructor(private readonly service: ParameterService) {}

  @Query(() => [Parameter])
  async parameters(): Promise<Parameter[] | never> {
    return await this.service.find();
  }

  @Query(() => Parameter)
  async parameter(@Args() args: GetParameterDto): Promise<Parameter | never> {
    return await this.service.findById(args.parameterId);
  }

  @Mutation(() => Parameter)
  async createParameter(
    @Args('input') input: CreateParameterDto,
  ): Promise<Parameter | never> {
    return await this.service.create(input);
  }

  @Mutation(() => Parameter)
  async updateParameter(
    @Args('input') input: UpdateParameterDto,
  ): Promise<Parameter | never> {
    return await this.service.update(input);
  }

  @Mutation(() => Boolean)
  async deleteParameter(
    @Args() args: DeleteParameterDto,
  ): Promise<boolean | never> {
    return await this.service.remove(args.parameterId);
  }
}

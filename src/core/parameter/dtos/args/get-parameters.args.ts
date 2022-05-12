import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { PaginationOptions } from '../../../../shared/utils/pagination/paginationType';

@InputType()
export class GetParametersFilter {
  @Field()
  search?: string;
}

@InputType()
export class GetParametersSort {
  @Field()
  createdAt?: string;
}

@ArgsType()
export class GetParametersArgs extends PaginationOptions<
  GetParametersSort,
  GetParametersFilter
>(GetParametersSort, GetParametersFilter) {}

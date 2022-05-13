import { Field, InputType } from '@nestjs/graphql';
import { SortBy } from '../utils/sort/dtos/sort-by.dto';
import { PaginationInput } from '../utils/pagination/dtos/pagination.input';
import { FiltersExpression } from '../utils/filter/dtos/filters.input';

@InputType()
export class PaginationQueryInput {
  @Field(() => PaginationInput, { defaultValue: new PaginationInput() })
  pagination?: PaginationInput = new PaginationInput();

  @Field(() => [SortBy], { defaultValue: [] })
  sort?: SortBy[] = [];

  @Field(() => String, { defaultValue: '' })
  search?: string = '';

  @Field(() => FiltersExpression, { defaultValue: null })
  filters?: FiltersExpression = null;
}

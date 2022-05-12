import { Field, InputType } from '@nestjs/graphql';
import { SortInput } from '../utils/sort/dtos/sort.input';
import { PaginationInput } from '../utils/pagination/dtos/pagination.input';
import { FiltersExpression } from '../utils/filter/dtos/filters.input';

@InputType()
export class PaginationQueryInput {
  @Field(() => PaginationInput, { defaultValue: new PaginationInput() })
  pagination?: PaginationInput = new PaginationInput();

  @Field(() => SortInput, { nullable: true })
  sort?: SortInput = null;

  @Field(() => String, { defaultValue: '' })
  search?: string = '';

  @Field(() => FiltersExpression, { defaultValue: null })
  filters?: FiltersExpression = null;
}

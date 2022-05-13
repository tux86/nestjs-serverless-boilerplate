import { Field, InputType } from '@nestjs/graphql';
import { PaginationInput } from '@/shared/utils/pagination/dtos/pagination.input';
import { SortBy } from '@/shared/utils/sort/dtos/sort-by.dto';
import { FiltersExpression } from '@/shared/utils/filter/dtos/filters.input';

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

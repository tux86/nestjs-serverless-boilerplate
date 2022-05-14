import { ArgsType, Field, Int } from '@nestjs/graphql';
import { SortBy } from '@/shared/utils/sort/dtos/sort-by.dto';
import { FiltersExpression } from '@/shared/utils/filter/dtos/filters.input';
import { IsOptional, MaxLength } from 'class-validator';
import { PaginationArgs } from '@/shared/utils/pagination/dtos/pagination.args';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ISortProp } from '@/shared/utils/sort/interfaces/sort-prop.interface';
import { ISearchProp } from '@/shared/utils/search/interfaces/search-prop.interface';
import { IFiltersProp } from '@/shared/utils/filter/interfaces/filters-prop.interface';

@ArgsType()
export class QueryListArgs
  extends PaginationArgs
  implements IPaginationOptions, ISortProp, ISearchProp, IFiltersProp
{
  @Field(() => [SortBy], { defaultValue: [] })
  @IsOptional()
  sort: SortBy[] = [];

  @Field(() => String, { defaultValue: '' })
  @MaxLength(128)
  @IsOptional()
  search = '';

  @Field(() => FiltersExpression, { defaultValue: null })
  @IsOptional()
  filters: FiltersExpression = null;
}

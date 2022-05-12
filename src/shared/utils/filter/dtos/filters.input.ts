import { Field, InputType } from '@nestjs/graphql';
import { FilterOperator } from '../enums/filter-operator.enum';
import { Filter } from './filter.input';

@InputType('FiltersInput')
export class FiltersExpression {
  @Field(() => FilterOperator, { defaultValue: FilterOperator.And })
  op: FilterOperator = FilterOperator.And;
  @Field(() => [Filter])
  filters: Filter[];
  @Field(() => [FiltersExpression], { nullable: true })
  childExpressions?: FiltersExpression[];
}

import { Field, InputType } from '@nestjs/graphql';
import { FilterOperation } from '../enums/filter-operation.enum';

@InputType('FilterInput')
export class Filter {
  @Field(() => String)
  attribute: string;
  @Field(() => FilterOperation, { defaultValue: FilterOperation.Eq })
  op: FilterOperation = FilterOperation.Eq;
  @Field(() => [String])
  values: string[];
  @Field(() => String, { nullable: true })
  relationField?: string;
}

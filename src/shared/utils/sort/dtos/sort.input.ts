import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../enums/sort-direction.enum';

@InputType()
export class SortInput {
  @Field()
  attribute: string;

  @Field(() => SortOrder, { defaultValue: SortOrder.Asc })
  direction: SortOrder;
}

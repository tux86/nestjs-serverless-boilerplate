import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../enums/sort-direction.enum';

@InputType('SortInput')
export class SortBy {
  @Field()
  attribute: string;

  @Field(() => SortOrder, { defaultValue: SortOrder.Asc })
  order: SortOrder = SortOrder.Asc;

  constructor(attribute: string, order: SortOrder = SortOrder.Asc) {
    /* empty */
  }
}

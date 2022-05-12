import { Field, InputType, Int } from '@nestjs/graphql';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

const DEFAULT_PAGE_LIMIT = 10;

@InputType()
export class PaginationInput implements IPaginationOptions {
  @Field(() => Int, { defaultValue: DEFAULT_PAGE_LIMIT })
  limit = DEFAULT_PAGE_LIMIT;

  @Field(() => Int, { defaultValue: 1 })
  page = 1;
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';

@ObjectType()
export class PaginationMeta implements IPaginationMeta {
  @Field(() => Int)
  itemCount: number;
  @Field(() => Int)
  totalItems: number;
  @Field(() => Int)
  itemsPerPage: number;
  @Field(() => Int)
  totalPages: number;
  @Field(() => Int)
  currentPage: number;
}

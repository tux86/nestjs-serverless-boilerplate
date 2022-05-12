import { Type } from '@nestjs/common';
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Pagination } from 'nestjs-typeorm-paginate';

export function PaginationOptions<S, F>(
  sortByClassRef: Type<S>,
  filterClassRef: Type<F>,
): any {
  @ArgsType()
  abstract class PaginationOptionsType {
    @Field(() => Int, { defaultValue: 10 })
    limit: number;

    @Field({ defaultValue: 1 })
    page: number;

    @Field(() => sortByClassRef, { nullable: true })
    sort?: S;

    @Field(() => filterClassRef, { nullable: true })
    filter?: F;

    @Field({ defaultValue: '' })
    search?: string;
  }

  return PaginationOptionsType;
}

@ObjectType()
class Meta {
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

export function PaginationType<Item>(classRef: Type<Item>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginationType extends Pagination<Item> {
    @Field(() => [classRef])
    items: Item[];

    @Field()
    meta: Meta;
  }
  return PaginationType;
}

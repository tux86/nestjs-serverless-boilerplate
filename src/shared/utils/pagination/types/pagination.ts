import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationMeta } from './pagination-meta';

export function PaginationTypeOf<Item>(classRef: Type<Item>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginationType extends Pagination<Item> {
    @Field(() => [classRef])
    items: Item[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
  }

  return PaginationType;
}

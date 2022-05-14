import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IsOptional, IsPositive } from 'class-validator';

const DEFAULT_PAGE_LIMIT = 10;

@ArgsType()
export class PaginationArgs implements IPaginationOptions {
  @Field(() => Int, { defaultValue: DEFAULT_PAGE_LIMIT })
  @IsPositive()
  @IsOptional()
  limit = DEFAULT_PAGE_LIMIT;

  @Field(() => Int, { defaultValue: 1 })
  @IsPositive()
  @IsOptional()
  page = 1;
}

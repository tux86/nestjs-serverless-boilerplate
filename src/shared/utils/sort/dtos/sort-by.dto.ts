import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../enums/sort-direction.enum';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

@InputType('SortByInput')
export class SortBy {
  @Field()
  @IsNotEmpty()
  attribute: string;

  @Field(() => SortOrder, { defaultValue: SortOrder.Asc })
  @IsOptional()
  @IsEnum(SortOrder)
  order: SortOrder = SortOrder.Asc;
}

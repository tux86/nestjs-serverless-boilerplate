import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsUppercase,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateOrganizationInput {
  @Field()
  @IsAlphanumeric()
  @IsUppercase()
  @MinLength(4)
  @MaxLength(10)
  orgId: string;

  @Field()
  @IsNotEmpty()
  name: string;
}

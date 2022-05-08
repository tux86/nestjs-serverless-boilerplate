import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsUppercase,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlphanumeric()
  @IsUppercase()
  @MinLength(4)
  @MaxLength(10)
  @Field()
  name: string;
}

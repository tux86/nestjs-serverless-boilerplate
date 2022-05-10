import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ParameterValueType } from '../enums/parameter-value-type.enum';
import { IsPascalCase } from '../../../shared/validators/decorators/is-pascal-case.decorator';

@InputType()
export class CreateParameterInput {
  @Field()
  @IsPascalCase()
  @MinLength(4)
  @MaxLength(100)
  name: string;

  @Field()
  @MinLength(4)
  @MaxLength(100)
  @IsEnum(ParameterValueType)
  valueType: ParameterValueType;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field()
  @IsBoolean()
  shared: boolean;
}

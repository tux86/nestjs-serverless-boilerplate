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
export class UpdateParameterInput {
  @Field({ nullable: true })
  @IsPascalCase()
  @MinLength(4)
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @MinLength(4)
  @MaxLength(100)
  @IsEnum(ParameterValueType)
  @IsOptional()
  valueType?: ParameterValueType;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  shared?: boolean;
}

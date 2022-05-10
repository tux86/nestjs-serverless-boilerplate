import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsUUID,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ParameterValueType } from '../enums/parameter-value-type.enum';
import { IsPascalCase } from '../../../shared/validators/decorators/is-pascal-case.decorator';
import { Parameter } from '../entities/parameter.entity';

@InputType('UpdateParameterInput')
export class UpdateParameterDto implements Partial<Parameter> {
  @Field(() => ID, { nullable: true })
  @IsUUID()
  parameterId?: string;

  @Field({ nullable: true })
  @IsPascalCase()
  @Length(4, 100)
  @IsOptional()
  name?: string;

  @Field(() => ParameterValueType, { nullable: true })
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

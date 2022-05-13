import { Field, ID, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsOptional, Length } from 'class-validator';
import { ParameterValueType } from '../../enums/parameter-value-type.enum';
import { IsPascalCase } from '@/shared/validators/decorators/is-pascal-case.decorator';
import { Parameter } from '../../entities/parameter.entity';

@InputType()
export class CreateParameterInput implements Partial<Parameter> {
  @Field(() => ID)
  @IsPascalCase()
  @Length(4, 100)
  name: string;

  @Field(() => ParameterValueType)
  @IsEnum(ParameterValueType)
  valueType: ParameterValueType;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field()
  @IsBoolean()
  shared: boolean;
}

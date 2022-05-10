import { Field, ArgsType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class DeleteParameterDto {
  @Field(() => ID)
  @IsUUID()
  parameterId: string;
}

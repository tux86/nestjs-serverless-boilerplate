import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class GetParameterArgs {
  @Field(() => ID)
  @IsUUID()
  parameterId: string;
}

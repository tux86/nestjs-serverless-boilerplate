import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class DeleteOrganizationDto {
  @Field(() => ID)
  @IsUUID()
  orgId: string;
}

import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsUppercase,
  Length,
} from 'class-validator';
import { Organization } from '../organization.entity';

@InputType('UpdateOrganizationInput')
export class UpdateOrganizationDto implements Partial<Organization> {
  @Field(() => ID)
  @IsAlphanumeric()
  @IsUppercase()
  @Length(4, 8)
  @IsOptional()
  orgId?: string;

  @Field()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}

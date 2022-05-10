import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsUppercase,
  Length,
} from 'class-validator';
import { Organization } from '../organization.entity';

@InputType('CreateOrganizationInput')
export class CreateOrganizationDto implements Partial<Organization> {
  @Field()
  @IsAlphanumeric()
  @IsUppercase()
  @Length(4, 8)
  orgId: string;

  @Field()
  @IsNotEmpty()
  name: string;
}

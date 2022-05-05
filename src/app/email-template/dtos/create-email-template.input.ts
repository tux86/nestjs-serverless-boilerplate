import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateEmailTemplateInput {
  @MinLength(2)
  @Field()
  name: string;

  @MinLength(2)
  @Field()
  subject: string;

  @Field()
  bodyText: string;

  @Field()
  bodyHtml: string;
}

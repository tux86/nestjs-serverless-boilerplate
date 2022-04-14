import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('EmailTemplate')
export class EmailTemplateType {
  @Field((type) => ID)
  emailTemplateId: string;

  @Field()
  name: string;

  @Field()
  subject: string;

  @Field()
  bodyText: string;

  @Field()
  bodyHtml: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

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
  body: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

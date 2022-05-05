import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('EmailTemplatePlaceholder')
export class EmailTemplatePlaceholderType {
  @Field(() => ID)
  name: string;

  @Field(() => String)
  value: string;
}

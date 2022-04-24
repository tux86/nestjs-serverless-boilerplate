import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class EmailTemplatePlaceholderObject {
  @Field(() => ID)
  name: string;

  @Field(() => String)
  value: string;
}

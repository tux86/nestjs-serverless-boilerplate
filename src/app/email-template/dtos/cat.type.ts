import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Cat')
export class CatType {
  @Field(() => ID)
  name: string;
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from '../user.service';
import { User } from '../user.entity';
import { CreateUserInput } from '../dtos/create-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {
    console.log('PRIVATE RESOLVER LOADED ***********************');
  }

  @Query(() => [User])
  users(): User[] {
    console.log('======== Query users===================');
    return [new User()];
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return new User();
  }
}

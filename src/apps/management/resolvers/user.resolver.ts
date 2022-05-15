import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from '@/core/user/user.service';
import { User } from '@/core/user/user.entity';
import { CreateUserInput } from '@/core/user/dtos/create-user.input';
import { sleep } from '@/shared/utils/sleep.util';

@Resolver()
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query(() => [User])
  users(): User[] {
    return [new User()];
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    await sleep(1);
    return new User();
  }
}

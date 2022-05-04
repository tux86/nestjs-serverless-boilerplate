import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateUserInput,
  User,
} from '../../../shared/graphql/management.graphql';

@Resolver()
export class UserManagementResolver {
  constructor() {
    console.log('PRIVATE RESOLVER LOADED ***********************');
  }

  @Query()
  users(): User[] {
    console.log('======== Query users===================');
    return [
      {
        name: 'toto',
        age: 23,
      },
    ];
  }

  @Mutation()
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return {
      name: 'toto',
      age: 23,
    };
  }
}

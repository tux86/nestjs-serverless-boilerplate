import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateCatInput,
  Cat,
} from '../../../shared/graphql/management.graphql';

@Resolver()
export class CatManagementResolver {
  constructor() {
    console.log('PRIVATE RESOLVER LOADED ***********************');
  }

  @Query()
  cats(): Cat[] {
    console.log('======== Query cats===================');
    return [
      {
        name: 'cat',
        age: 23,
      },
    ];
  }

  @Mutation()
  async createCat(@Args('input') input: CreateCatInput): Promise<Cat> {
    return {
      name: 'cat',
      age: 23,
    };
  }
}

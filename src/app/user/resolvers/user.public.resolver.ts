import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../../../shared/graphql/public.graphql';

@Resolver()
export class UserPublicResolver {
  constructor() {
    console.log('PUBLIC RESOLVER LOADED ***********************');
  }
  @Query()
  user(): User {
    return {
      id: 123,
      name: 'toto',
    };
  }
}

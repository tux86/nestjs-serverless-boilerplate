import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../../../shared/graphql/public.graphql';
import { UserService } from '../user.service';

@Resolver()
export class UserPublicResolver {
  constructor(private readonly userService: UserService) {
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

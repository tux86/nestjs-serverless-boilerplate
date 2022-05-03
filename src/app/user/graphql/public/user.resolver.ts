import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../../user.service';
import { User } from '../../../../shared/graphql/public.graphql';

@Resolver()
export class UserResolver {
  @Query()
  user(): User {
    return {
      id: 123,
      name: 'toto',
    };
  }
}

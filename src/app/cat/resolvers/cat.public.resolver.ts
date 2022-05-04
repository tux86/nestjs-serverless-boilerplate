import { Query, Resolver } from '@nestjs/graphql';
import { CatService } from '../cat.service';
import { Cat } from '../../../shared/graphql/public.graphql';

@Resolver()
export class CatPublicResolver {
  constructor() {
    console.log('PUBLIC RESOLVER LOADED ***********************');
  }
  @Query()
  cat(): Cat {
    return {
      id: 123,
      name: 'cat',
    };
  }
}

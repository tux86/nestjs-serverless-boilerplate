import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApiName } from '../enums/graphql.enum';

export const createApolloDriverConfig = (
  apiName: ApiName,
  modules: any[],
): ApolloDriverConfig => {
  return {
    driver: ApolloDriver,
    // autoSchemaFile: true,
    // autoSchemaFile: join(process.cwd(), 'src/schemas.gql'),
    typePaths: [`*/**/${apiName}/*.graphql`],
    path: `${apiName}/graphql`,
    // cache: false,
    // subscription: false,
    disableHealthCheck: true,
    playground: true,
    sortSchema: true,
    definitions: {
      path: join(process.cwd(), `src/shared/graphql/${apiName}.graphql.ts`),
      outputAs: 'class',
    },
    include: [...modules],
  };
};

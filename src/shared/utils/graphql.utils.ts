import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { EndpointName } from '../enums/endpoint-name.enum';
import { GenerateOptions } from '@nestjs/graphql/dist/graphql-definitions.factory';

/**
 * Generate types definitions from endpoint name
 * @param endpointName
 */
export const getTypesDefinitionsConfig = (
  endpointName: EndpointName,
): GenerateOptions => {
  return {
    typePaths: [`*/**/*.${endpointName}.gql`],
    path: join(process.cwd(), `src/shared/graphql/${endpointName}.graphql.ts`),
    outputAs: 'class',
  };
};

/**
 * Generate Apollo drivers config from endpoint name
 * @param options
 */
export const getEndpointGraphqlConfig = (options: {
  endpointName: EndpointName;
  include: any[];
}): ApolloDriverConfig => {
  const { endpointName, include } = options;

  const {
    typePaths,
    outputAs,
    path: definitionsPath,
  } = getTypesDefinitionsConfig(endpointName);
  return {
    driver: ApolloDriver,
    typePaths,
    path: `${endpointName}/graphql`,
    disableHealthCheck: true,
    playground: true,
    sortSchema: true,
    debug: false,
    definitions: {
      path: definitionsPath,
      outputAs,
    },
    include,
  };
};

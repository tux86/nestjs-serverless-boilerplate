import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { EndpointName } from './enums/endpoint-name.enum';
import { GenerateOptions } from '@nestjs/graphql/dist/graphql-definitions.factory';
import { modules as resolversModules } from './resolvers-modules';

/**
 * Returns resolvers module for a specific endpoint
 * @param endpointName
 */
export const getEndpointResolversModule = (endpointName: EndpointName) => {
  if (!resolversModules.has(endpointName)) {
    throw new Error(
      'could not find resolvers module for endpoint : ' + endpointName,
    );
  }
  return resolversModules.get(endpointName);
};

/**
 * Generate types definitions from endpoint name
 * @param endpointName
 */
export const getTypesDefinitionsConfig = (
  endpointName: EndpointName,
): GenerateOptions => {
  return {
    typePaths: [`*/**/*.${endpointName}.graphql`],
    path: join(process.cwd(), `src/shared/graphql/${endpointName}.graphql.ts`),
    outputAs: 'interface',
  };
};

/**
 * Generate Apollo drivers config from endpoint name
 * @param endpointName
 */
export const getEndpointGraphqlConfig = (
  endpointName: EndpointName,
): ApolloDriverConfig => {
  const ResolversModule = getEndpointResolversModule(endpointName);

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
    include: [ResolversModule],
  };
};

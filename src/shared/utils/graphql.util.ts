import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

/**
 * Generate Apollo drivers config from endpoint name
 * @param options
 */
export const getEndpointGraphqlConfig = (options: {
  path: string;
}): ApolloDriverConfig => {
  const { path } = options;

  let config: ApolloDriverConfig = {
    driver: ApolloDriver,
    autoSchemaFile: true, // generated on-the-fly in memory (needed for lambda)
    path,
    disableHealthCheck: true,
    sortSchema: false,
    debug: false,
    introspection: process.env.ENABLE_GRAPHQL_INTROSPECTION === 'true',
    playground: false,
    formatError: (error: GraphQLError) => {
      delete error.extensions?.code;
      return error;
    },
  };

  if (process.env.ENABLE_GRAPHQL_PLAYGROUND === 'true') {
    config = {
      ...config,
      ...({
        playground: false, // must be disabled if ApolloServerPluginLandingPage
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      } as Partial<ApolloDriverConfig>),
    };
  }

  return config;
};

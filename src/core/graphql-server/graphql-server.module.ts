import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { getEndpointGraphqlConfig } from './graphql-server.utils';
import { EndpointName } from './enums/endpoint-name.enum';
import { modules } from './resolvers-modules';

const ResolversModules = modules.values();
@Module({
  imports: [
    ...ResolversModules, // import all resolvers modules
    // graphql management api module
    GraphQLModule.forRoot<ApolloDriverConfig>(
      getEndpointGraphqlConfig(EndpointName.Management),
    ),
    // graphql public api module
    GraphQLModule.forRoot<ApolloDriverConfig>(
      getEndpointGraphqlConfig(EndpointName.Public),
    ),
  ],
})
export class GraphqlServerModule {}

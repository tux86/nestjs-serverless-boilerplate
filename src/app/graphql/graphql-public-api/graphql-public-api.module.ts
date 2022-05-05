import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { getEndpointGraphqlConfig } from '../../../shared/utils/graphql.utils';
import { EndpointName } from '../../../shared/enums/endpoint-name.enum';
import resolverModules from './resolvers-modules';

@Module({
  imports: [
    ...resolverModules,
    GraphQLModule.forRoot<ApolloDriverConfig>(
      getEndpointGraphqlConfig({
        endpointName: EndpointName.Public,
        include: resolverModules,
      }),
    ),
  ],
})
export class GraphqlPublicApiModule {}

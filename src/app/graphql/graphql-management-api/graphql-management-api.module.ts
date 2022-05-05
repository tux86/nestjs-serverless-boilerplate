import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import resolversModules from './resolvers-modules';
import { getEndpointGraphqlConfig } from '../../../shared/utils/graphql.utils';
import { EndpointName } from '../../../shared/enums/endpoint-name.enum';

@Module({
  imports: [
    ...resolversModules,
    GraphQLModule.forRoot<ApolloDriverConfig>(
      getEndpointGraphqlConfig({
        endpointName: EndpointName.Management,
        include: resolversModules,
      }),
    ),
  ],
})
export class GraphqlManagementApiModule {}

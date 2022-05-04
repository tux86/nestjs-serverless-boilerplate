import { ManagementResolversModule } from './management-resolvers.module';
import { PublicResolversModule } from './public-resolvers.module';
import { EndpointName } from '../enums/endpoint-name.enum';

export const modules = new Map<EndpointName, any>([
  [EndpointName.Management, ManagementResolversModule],
  [EndpointName.Public, PublicResolversModule],
]);

import { OrganizationResolver } from './organization.resolver';
import { ParameterResolver } from './parameter.resolver';
import { ParameterValueResolver } from './parameter-value.resolver';

export const resolvers = [
  OrganizationResolver,
  ParameterResolver,
  ParameterValueResolver,
];

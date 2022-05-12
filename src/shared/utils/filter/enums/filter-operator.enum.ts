import { registerEnumType } from '@nestjs/graphql';

export enum FilterOperator {
  And = 'AND',
  Or = 'OR',
}

registerEnumType(FilterOperator, {
  name: 'FilterOperator',
});

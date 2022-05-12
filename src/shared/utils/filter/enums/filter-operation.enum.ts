import { registerEnumType } from '@nestjs/graphql';

export enum FilterOperation {
  Eq = 'EQ',
  NotEq = 'NOT_EQ',
  Lt = 'LT',
  Lte = 'LTE',
  Gt = 'GT',
  Gte = 'GTE',
  Exist = 'EXIST',
  NotExist = 'NOT_EXIST',
  In = 'IN',
  Not = 'NOT',
  Like = 'LIKE',
  ILike = 'I_LIKE',
  Contains = 'CONTAINS',
  NotContains = 'NOT_CONTAINS',
  Between = 'BETWEEN',
  NotBetween = 'NOT_BETWEEN',
  Regex = 'REGEX',
  Empty = 'EMPTY',
  NotEmpty = 'NOT_EMPTY',
  IsNull = 'IS_NULL',
  NotNull = 'NOT_NULL',
}

registerEnumType(FilterOperation, {
  name: 'FilterOperation',
});

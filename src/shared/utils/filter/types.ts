import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR',
}

registerEnumType(LogicalOperator, {
  name: 'LogicalOperator',
});

export enum Operator {
  Eq = 'Eq',
  NotEq = 'NotEq',
  Lt = 'Lt',
  Lte = 'Lte',
  Gt = 'Gt',
  Gte = 'Gte',
  Exist = 'Exist',
  NotExist = 'NotExist',
  In = 'In',
  Not = 'Not',
  Like = 'Like',
  ILike = 'ILike',
  Contains = 'Contains',
  NotContains = 'NotContains',
  Between = 'Between',
  NotBetween = 'NotBetween',
  Regex = 'Regex',
  Empty = 'Empty',
  NotEmpty = 'NotEmpty',
  IsNull = 'IsNull',
  IsNotNull = 'IsNotNull',
}

registerEnumType(Operator, {
  name: 'Operator',
});

export enum Direction {
  Asc = 'asc',
  Desc = 'desc',
}

registerEnumType(Direction, {
  name: 'SortDirection',
});

@InputType()
export class Types {
  @Field(() => String)
  attribute: string;
  @Field(() => Operator, { defaultValue: Operator.Eq })
  op?: Operator = Operator.Eq;
  @Field(() => [String])
  values: string[];
  @Field(() => String, { nullable: true })
  relationField?: string;
}

@InputType()
export class FiltersExpression {
  @Field(() => LogicalOperator, { defaultValue: LogicalOperator.And })
  op?: LogicalOperator = LogicalOperator.And;
  @Field(() => [Types])
  filters: Types[];
  @Field(() => [FiltersExpression], { nullable: true })
  childExpressions?: FiltersExpression[];
}

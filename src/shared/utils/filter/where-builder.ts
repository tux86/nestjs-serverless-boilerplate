import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { Types, FiltersExpression, Operator } from './types';
import { isEmpty, map } from 'lodash';

type ParamValue = string | number | Array<string | number>;

export class WhereBuilder<Entity> {
  private params: Record<string, ParamValue> = {};
  private paramsCount = 0;

  constructor(
    private readonly qb: SelectQueryBuilder<Entity>,
    private filtersExpression?: FiltersExpression,
  ) {}

  build() {
    if (!this.filtersExpression) return;
    const whereSql = this.buildExpressionRec(this.filtersExpression);
    this.qb.where(whereSql, this.params);
  }

  private buildExpressionRec(fe: FiltersExpression): string {
    const filters = map(fe.filters, (f) => this.buildFilter(f));
    const children = map(fe.childExpressions, (child) =>
      this.buildExpressionRec(child),
    );

    const allSqlBlocks = [...filters, ...children];
    const sqLExpr = allSqlBlocks.join(` ${fe.op} `);
    return isEmpty(sqLExpr) ? '' : `(${sqLExpr})`;
  }

  private buildFilter(filter: Types): string {
    const paramName = `${filter.attribute}_${++this.paramsCount}`;

    switch (filter.op) {
      case Operator.Eq:
        this.params[paramName] = filter.values[0];
        return `${filter.attribute} = :${paramName}`;
      case Operator.NotEq:
        this.params[paramName] = filter.values[0];
        return `${filter.attribute} != :${paramName}`;
      case Operator.In:
        this.params[paramName] = filter.values;
        return `${filter.attribute} IN (:${paramName})`;
      case Operator.Like:
        this.params[paramName] = `%${filter.values[0]}%`;
        return `${filter.attribute} LIKE :${paramName}`;
      case Operator.ILike:
        this.params[paramName] = `%${filter.values[0]}%`;
        return `${filter.attribute} ILIKE :${paramName}`;
      case Operator.Gte:
        this.params[paramName] = filter.values[0];
        return `${filter.attribute} >= :${paramName}`;
      default:
        throw new Error(`Unknown filter operation: ${filter.op}`);
    }
  }
}

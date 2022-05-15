import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { isEmpty, map } from 'lodash';
import { FiltersExpression } from '../dtos/filters.input';
import { FilterOperation } from '../enums/filter-operation.enum';
import { Filter } from '../dtos/filter.input';

type ParamValue = string | number | (string | number)[];

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
    this.qb.andWhere(whereSql, this.params);
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

  private buildFilter(filter: Filter): string {
    const paramName = `${filter.attribute}_${++this.paramsCount}`;

    switch (filter.op) {
      case FilterOperation.Eq:
        this.params[paramName] = filter.values[0];
        return `${filter.attribute} = :${paramName}`;
      case FilterOperation.NotEq:
        this.params[paramName] = filter.values[0];
        return `${filter.attribute} != :${paramName}`;
      case FilterOperation.In:
        this.params[paramName] = filter.values;
        return `${filter.attribute} IN (:${paramName})`;
      case FilterOperation.Like:
        this.params[paramName] = `%${filter.values[0]}%`;
        return `${filter.attribute} LIKE :${paramName}`;
      case FilterOperation.ILike:
        this.params[paramName] = `%${filter.values[0]}%`;
        return `${filter.attribute} ILIKE :${paramName}`;
      case FilterOperation.Gte:
        this.params[paramName] = filter.values[0];
        return `${filter.attribute} >= :${paramName}`;
      case FilterOperation.Gt:
        this.params[paramName] = filter.values[0];
        return `${filter.attribute} > :${paramName}`;
      case FilterOperation.Lte:
        this.params[paramName] = filter.values[0];
        return `${filter.attribute} <= :${paramName}`;
      case FilterOperation.Lt:
        this.params[paramName] = filter.values[0];
        return `${filter.attribute} < :${paramName}`;
      default:
        throw new Error(`Unknown filter operation: ${filter.op}`);
    }
  }
}

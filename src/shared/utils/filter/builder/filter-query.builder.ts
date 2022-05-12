import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { JoinBuilder } from './join.builder';
import { WhereBuilder } from './where.builder';
import { FiltersExpression } from '../dtos/filters.input';

export const filterQueryBuilder = <Entity>(
  qb: SelectQueryBuilder<Entity>,
  filters?: FiltersExpression,
): SelectQueryBuilder<Entity> | void => {
  const jb = new JoinBuilder<Entity>(qb, filters);
  jb.build();
  const wb = new WhereBuilder<Entity>(qb, filters);
  wb.build();
};

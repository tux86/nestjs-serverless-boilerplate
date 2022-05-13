import { SortBy } from './dtos/sort-by.dto';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

export const sortQueryBuilder = <Entity>(
  qb: SelectQueryBuilder<Entity>,
  sortList: SortBy[] = [],
): void => {
  for (const { attribute, order } of sortList) {
    qb.addOrderBy(attribute, order);
  }
};

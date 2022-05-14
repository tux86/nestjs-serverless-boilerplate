import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { Brackets } from 'typeorm';

export const searchQueryBuilder = <Entity>(
  qb: SelectQueryBuilder<Entity>,
  searchAttributes: string[],
  search: string,
): SelectQueryBuilder<Entity> | void => {
  if (search) {
    qb.andWhere(
      new Brackets((qb: SelectQueryBuilder<Entity>) => {
        for (const attribute of searchAttributes) {
          qb.orWhere(
            `LOWER(unaccent(${attribute})) LIKE LOWER(unaccent(:search))`,
            {
              search: `%${search}%`,
            },
          );
        }
      }),
    );
  }
};

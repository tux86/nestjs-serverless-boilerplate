import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { Repository } from 'typeorm';
import { FiltersExpression } from './types';
import { JoinBuilder } from './join-builder';
import { WhereBuilder } from './where-builder';

export default class FilterQueryBuilder<Entity> {
  private readonly qb: SelectQueryBuilder<Entity>;

  constructor(
    entityRepository: Repository<Entity>,
    private filtersExpression?: FiltersExpression,
  ) {
    this.qb = entityRepository.createQueryBuilder();
  }

  build() {
    const jb = new JoinBuilder<Entity>(this.qb, this.filtersExpression);
    jb.build();

    const wb = new WhereBuilder<Entity>(this.qb, this.filtersExpression);
    wb.build();

    return this.qb;
  }
}

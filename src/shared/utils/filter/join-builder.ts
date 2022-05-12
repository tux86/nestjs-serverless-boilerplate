import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { FiltersExpression } from './types';
import { forEach } from 'lodash';

export class JoinBuilder<Entity> {
  private joinedEntities = new Set<string>();

  constructor(
    private readonly qb: SelectQueryBuilder<Entity>,
    private filtersExpression?: FiltersExpression,
  ) {}

  build() {
    if (this.filtersExpression)
      this.buildJoinEntitiesRec(this.filtersExpression);
  }

  private buildJoinEntitiesRec(fe: FiltersExpression) {
    forEach(fe.filters, (f) =>
      this.addJoinEntity(f.attribute, f.relationField),
    );
    forEach(fe.childExpressions, (child) => this.buildJoinEntitiesRec(child));
  }

  private addJoinEntity(field: string, relationField?: string) {
    const entityName = field.split('.').shift();

    console.log('field', field);
    if (relationField && !this.joinedEntities.has(entityName)) {
      this.qb.leftJoinAndSelect(relationField, entityName);
      this.joinedEntities.add(entityName);
    }
  }
}

import { registerEnumType } from '@nestjs/graphql';

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

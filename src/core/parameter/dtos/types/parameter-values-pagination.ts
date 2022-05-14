import { ObjectType } from '@nestjs/graphql';
import { ParameterValue } from '../../entities/parameter-value.entity';
import { PaginationTypeOf } from '@/shared/utils/pagination/types/pagination';

@ObjectType()
export class ParameterValuesPagination extends PaginationTypeOf(
  ParameterValue,
) {}

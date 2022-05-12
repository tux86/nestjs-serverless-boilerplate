import { ObjectType } from '@nestjs/graphql';
import { ParameterValue } from '../../entities/parameter-value.entity';
import { PaginationType } from '../../../../shared/utils/pagination';

@ObjectType()
export class ParameterValuesPagination extends PaginationType(ParameterValue) {}

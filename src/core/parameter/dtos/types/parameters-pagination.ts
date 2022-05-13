import { ObjectType } from '@nestjs/graphql';
import { Parameter } from '../../entities/parameter.entity';
import { PaginationTypeOf } from '@/shared/utils/pagination/types/pagination';

@ObjectType()
export class ParametersPagination extends PaginationTypeOf(Parameter) {}

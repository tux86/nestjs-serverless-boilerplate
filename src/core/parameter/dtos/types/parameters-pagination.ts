import { ObjectType } from '@nestjs/graphql';
import { Parameter } from '../../entities/parameter.entity';
import { PaginationType } from '../../../../shared/utils/pagination';

@ObjectType()
export class ParametersPagination extends PaginationType(Parameter) {}

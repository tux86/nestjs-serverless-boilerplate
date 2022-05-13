export * from './abstracts/exceptions.abstract';

import {
  AbstractResourceAlreadyExistsException,
  AbstractResourceNotExistsException,
  ExceptionsAbstract,
} from './abstracts/exceptions.abstract';
import { HttpStatus, Type } from '@nestjs/common';

export class InternalServerErrorException extends ExceptionsAbstract {
  constructor(message = 'Internal Server Error') {
    super(message, 'E00000', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ResourceNotExistsException<
  T,
> extends AbstractResourceNotExistsException<T> {
  constructor(classRef: Type<T> | undefined, id: string | undefined) {
    super(classRef, id, undefined, undefined);
  }
}

export class ResourceAlreadyExistsException<
  T,
> extends AbstractResourceAlreadyExistsException<T> {
  constructor(classRef: Type<T> | undefined, id: string | undefined) {
    super(classRef, id, undefined, undefined);
  }
}

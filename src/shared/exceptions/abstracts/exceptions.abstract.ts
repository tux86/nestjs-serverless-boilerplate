import { HttpStatus, Type } from '@nestjs/common';
import util from 'util';

/**
 * Exception
 * The definition of an Exception
 */
export interface Exception {
  errorCode: string;
  errorType: string;
  statusCode: HttpStatus;
}

/**
 * ExceptionsAbstract
 */
export abstract class ExceptionsAbstract extends Error implements Exception {
  errorCode: string;
  errorType: string;
  statusCode: HttpStatus;

  protected constructor(
    message: string,
    errorCode: string,
    statusCode: HttpStatus,
    ...args: any
  ) {
    if (args) {
      message = util.format(message, ...args);
    }

    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errorType = new.target.name; // get child class name
    this.message = `[ErrorCode:${this.errorCode}] ${message}`;
  }
}

/**
 * BusinessLogicException
 * describes a business logic error
 */
export abstract class BusinessLogicException extends ExceptionsAbstract {}

/**
 * AbstractResourceException
 * describes error about a resource (database entity, cloud resource ...)
 */
export abstract class AbstractResourceException<
  T,
> extends BusinessLogicException {
  protected constructor(
    errorCode: string,
    httpStatus: HttpStatus,
    suffix: string | undefined,
    classRef: Type<T> | undefined,
    id?: string,
  ) {
    const parts = [suffix];
    if (classRef && classRef.name) {
      parts.unshift(classRef.name);
    }
    if (!classRef) {
      parts.unshift('Item');
    }
    if (id) {
      parts.unshift([parts.shift(), id].join(':'));
    }
    const message = parts.join(' ');
    super(message, errorCode, httpStatus);
  }
}

/**
 * AbstractResourceNotExistsException
 * describes not existing resource
 */
export abstract class AbstractResourceNotExistsException<
  T,
> extends AbstractResourceException<T> {
  protected constructor(
    classRef: Type<T> | undefined,
    id: string | undefined,
    suffix: string | undefined,
    code?: string,
  ) {
    super(
      code || 'E00001',
      HttpStatus.NOT_FOUND,
      suffix || 'does not exists',
      classRef,
      id,
    );
  }
}

/**
 * AbstractResourceAlreadyExistsException
 * describes an already existing resource
 */
export abstract class AbstractResourceAlreadyExistsException<
  T,
> extends AbstractResourceException<T> {
  protected constructor(
    classRef: Type<T> | undefined,
    id: string | undefined,
    suffix: string | undefined,
    code?: string,
  ) {
    super(
      code || 'E00002',
      HttpStatus.CONFLICT,
      suffix || 'already exists',
      classRef,
      id,
    );
  }
}

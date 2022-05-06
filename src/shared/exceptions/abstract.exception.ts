import { HttpStatus } from '@nestjs/common';
import util from 'util';

export abstract class AbstractException extends Error {
  errorCode: string;
  errorType: string;
  statusCode: HttpStatus;

  constructor(
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
    this.message = `${this.errorCode}: ${message}`;
  }
}

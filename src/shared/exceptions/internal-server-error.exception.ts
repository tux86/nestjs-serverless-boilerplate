import { AbstractException } from './app.exception';
import { HttpStatus } from '@nestjs/common';

export class InternalServerErrorException extends AbstractException {
  constructor(message = 'Internal Server Error') {
    super(message, 'E00000', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

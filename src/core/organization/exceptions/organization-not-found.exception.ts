import { HttpStatus } from '@nestjs/common';
import { BusinessLogicException } from '@/shared/exceptions';

export class OrganizationNotFoundException extends BusinessLogicException {
  constructor(orgId: string, message?: string) {
    message = 'organization (%s) not found';
    super(message, 'E02000', HttpStatus.NOT_FOUND, orgId);
  }
}

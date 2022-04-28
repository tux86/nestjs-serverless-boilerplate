import { ApiProperty } from '@nestjs/swagger';

export class AuthParams {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEmailTemplateDto {
  @IsString()
  @MinLength(2)
  @MaxLength(128)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  subject: string;

  @IsString()
  body: string;
}

import { IsDefined, IsEmail, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  readonly username: string;

  @IsEmail({}, { message: i18nValidationMessage('errors.invalid_email') })
  readonly email: string;

  @IsString()
  readonly password: string;
  @IsDefined()
  readonly country: string;
}

import { IsEmail, IsString } from 'class-validator';

export class SignUpReqDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  nickname: string;

  @IsString()
  appVersion: string;
}

export class SignInReqDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

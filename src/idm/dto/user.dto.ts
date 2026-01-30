import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class UpdateUserDto extends PartialType(RegisterUserDto) {}

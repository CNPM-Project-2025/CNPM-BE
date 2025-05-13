import { IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsInt()
  status: number;

  refresh_token: string;
}

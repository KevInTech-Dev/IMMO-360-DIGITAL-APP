import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export enum UserRole {
  CLIENT = 'CLIENT',
  PROPRIETAIRE = 'PROPRIETAIRE',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsString()
  @IsOptional()
  telephone?: string;
}

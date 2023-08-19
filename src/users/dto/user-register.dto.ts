import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Email is incorrect!' })
	email: string;

	@IsString({ message: 'Password is not valid' })
	password: string;

	@IsString({ message: 'Name is not valid' })
	name: string;
}

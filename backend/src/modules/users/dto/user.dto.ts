import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

import { UserRole } from "../entities/userRole.enum";
import { UserStatus } from "../entities/userStatus.enum";

export class UserDto {
    @IsNotEmpty()
	@IsUUID('all')
	id: string;

	@IsOptional()
	@IsString()
	password?: string;

	@IsNotEmpty()
	// @IsEmail()  // no have validation on front
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	name: string;

	@IsNotEmpty()
	@IsEnum(UserRole)
	role: UserRole;

	@IsNotEmpty()
	@IsEnum(UserStatus)
	status: UserStatus;
}
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { AffiliatesStatus } from "../entities/affiliateStatus.enum";

export class AffiliateDto {

    @IsNotEmpty()
	@IsUUID('all')
	id: string;

	@IsOptional()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	company: string;

    @IsNotEmpty()
	@IsUUID('all')
	managerId: string;

	manager?: string;

	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsEnum(AffiliatesStatus)
	status: AffiliatesStatus;
}
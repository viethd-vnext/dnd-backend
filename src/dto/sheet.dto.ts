import { IsOptional, IsString, IsNumber, IsBoolean, Min, Max } from 'class-validator';

export class CreateCharacterSheetDTO {
	@IsOptional()
	@IsString()
	userID?: string;

	@IsString()
	characterName: string;

	@IsNumber()
	@Min(1)
	@Max(30)
	armorClass: number;

	@IsString()
	characterClass: string;
	
	@IsNumber()
	hp: number;

	@IsNumber()
	tempHP: number;

	@IsString()
	background: string;

	@IsOptional()
	@IsBoolean()
	active?: boolean;
}

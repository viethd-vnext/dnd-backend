import { IsOptional, IsString, IsNumber, IsBoolean, Min, Max } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateCharacterSheetDTO {

	@IsString()
	characterName: string
	
	@IsNumber()
	@Min(1)
	@Max(30)
	armorClass: number

	@IsString()
	characterClass: string
	
	@IsNumber()
	hp: number

	@IsNumber()
	maxHP: number
	@IsNumber()
	tempHP: number

	@IsString()
	background: string

	@IsOptional()
	@IsBoolean()
	active?: boolean
}

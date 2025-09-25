import { IsOptional, IsString, IsNumber, IsBoolean, Min, Max, IsEmpty, IsNotEmpty } from 'class-validator';
export class CreateCharacterSheetDTO {

	@IsNotEmpty({message: "Missing character name."})
	@IsString()
	characterName: string
	
	@IsNotEmpty({message: "Missing armor class."})
	@IsNumber()
	@Min(1)
	@Max(35)
	armorClass: number

	@IsNotEmpty({message: "Missing character class."})
	@IsString()
	characterClass: string
	
	@IsNotEmpty({message: "Missing character HP."})
	@IsNumber()
	hp: number

	@IsNotEmpty({message: "Missing character max HP."})
	@IsNumber()
	maxHP: number

	@IsNotEmpty({message: "Missing character temporary HP."})
	@IsNumber()
	tempHP: number

	@IsNotEmpty({message: "Missing character background."})
	@IsString()
	background: string

	@IsOptional()
	@IsBoolean()
	active?: boolean
}

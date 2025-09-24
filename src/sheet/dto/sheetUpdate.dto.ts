import { IsOptional, IsString, IsNumber, IsBoolean, Min, Max } from 'class-validator';

export class SheetUpdateDTO {
    @IsOptional()
    @IsString()
    characterName: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(30)
    armorClass: number;

    @IsOptional()
    @IsNumber()
    hp: number;

    @IsOptional()
    @IsNumber()
    tempHP: number;

    @IsOptional()
    @IsString()
    background: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}

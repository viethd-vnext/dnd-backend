import { IsOptional, IsNumber, IsBoolean, Min, Max, IsEnum } from 'class-validator';

export class DamageDTO {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(400)
    amount: number;

    @IsEnum(['bludgeoning', 'piercing', 'slashing', 'fire', 'cold', 'acid', 'thunder', 'lightning', 'poison' , 'radiant', 'necrotic', 'psychic', 'force'], {message: "Invalid type"})
    type: 'bludgeoning'|'piercing'|'slashing'|'fire'|'cold'|'acid'|'thunder'|'lightning'|'poison'|'radiant'|'necrotic'|'psychic'|'force'
}
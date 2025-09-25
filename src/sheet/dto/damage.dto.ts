import { IsNumber, Min, Max, IsEnum, IsNotEmpty } from 'class-validator';

export class DamageDTO {
    @IsNotEmpty({message: "No damage amount found."})
    @IsNumber()
    @Min(1)
    @Max(400)
    amount: number
    
    @IsNotEmpty({message: "No damage type found."})
    @IsEnum(['bludgeoning', 'piercing', 'slashing', 'fire', 'cold', 'acid', 'thunder', 'lightning', 'poison' , 'radiant', 'necrotic', 'psychic', 'force'], {message: "Invalid type"})
    type: 'bludgeoning'|'piercing'|'slashing'|'fire'|'cold'|'acid'|'thunder'|'lightning'|'poison'|'radiant'|'necrotic'|'psychic'|'force'
}
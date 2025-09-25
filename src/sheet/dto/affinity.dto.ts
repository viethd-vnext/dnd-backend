import { IsNumber, Min, Max, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AffinityDTO {
    @IsNotEmpty({message: "No affinity state declared."})
    @IsEnum(['neutral', 'resistant','vulnerable', 'immune'])
    state: 'neutral' | 'resistant' | 'vulnerable' | 'immune'
    
    @IsNotEmpty({message: "No damage type found."})
    @IsEnum(['bludgeoning', 'piercing', 'slashing', 'fire', 'cold', 'acid', 'thunder', 'lightning', 'poison' , 'radiant', 'necrotic', 'psychic', 'force'], {message: "Invalid type"})
    type: 'bludgeoning'|'piercing'|'slashing'|'fire'|'cold'|'acid'|'thunder'|'lightning'|'poison'|'radiant'|'necrotic'|'psychic'|'force'
}
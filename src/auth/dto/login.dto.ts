import { IsString, IsEmail, Min, Max } from "class-validator";

export class UserUpdateDTO {

    @IsEmail({}, { message: 'Invalid slug' })
    email: string;

    @IsString()
    @Min(8, { message: 'Minimum 8 characters' })
    @Max(40, { message: 'Maximum 40 characters' })
    password: string;
}
import { IsOptional, IsString, MinLength, MaxLength, IsEmail, IsEnum, Min, Max, IsBoolean } from "class-validator";

export class UserUpdateDTO {
    @IsOptional()
    id: number;

    @IsOptional()
    @IsString({ message: 'Username must be a string.' })
    @MinLength(10, { message: 'Username must be at least 10 characters.' })
    @MaxLength(40, { message: 'Username must be at most 40 characters.' })
    name: string;

    @IsOptional()
    @IsEmail({}, { message: 'Invalid slug' })
    email: string;

    @IsOptional()
    photo: string;

    @IsOptional()
    @IsEnum(['user', 'admin'], {message: "Invalid role"})
    role: 'user' | 'admin'

    @IsOptional()
    @IsString()
    @Min(8, { message: 'Minimum 8 characters' })
    @Max(40, { message: 'Maximum 40 characters' })
    password: string;

    @IsOptional()
    @IsString()
    @Min(8, { message: 'Minimum 8 characters' })
    @Max(40, { message: 'Maximum 40 characters' })
    passwordConfirm: string;
   
    @IsOptional()
    passwordChangedAt: Date;
    
    @IsOptional()
    @IsString()
    passwordResetToken: string;
    
    @IsOptional()
    passwordResetExpires: Date;

    @IsOptional()
    @IsBoolean({message: "Must be a true/false boolean."})  
    active: boolean;
}
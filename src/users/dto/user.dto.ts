import { IsOptional, IsString, MinLength, MaxLength, IsEmail, IsEnum, Min, Max, IsBoolean, Matches } from "class-validator";

export class UserDTO {
    @IsOptional()
    id: number;

    @IsString({ message: 'Username must be a string.' })
    name: string;

    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @IsOptional()
    photo: string;

    @IsEnum(['user', 'admin'], {message: "Invalid role"})
    role: 'user' | 'admin'
    
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters.' })
    @MaxLength(40, { message: 'Password must be at most 40 characters.' })
    @Matches(/[^A-Za-z0-9]/, { message: 'Password must include a special character.' })
    password: string | null | undefined;

    @MinLength(8, { message: 'Password must be at least 8 characters.' })
    @MaxLength(40, { message: 'Password must be at most 40 characters.' })
    @Matches(/[^A-Za-z0-9]/, { message: 'Password must include a special character.' })
    @IsString()
    passwordConfirm: string | null | undefined;
   
    @IsOptional()
    passwordChangedAt: Date;

    @IsString()
    @IsOptional()
    passwordResetToken: string;
    
    @IsOptional()
    passwordResetExpires: Date;

    @IsOptional()
    @IsBoolean({message: "Must be a true/false boolean."})  
    active: boolean;
}
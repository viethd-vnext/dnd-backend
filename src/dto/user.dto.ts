import { IsOptional, IsString, MinLength, MaxLength, IsEmail, IsEnum, Min, Max, IsBoolean } from "class-validator";

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
    password: string | null | undefined;

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
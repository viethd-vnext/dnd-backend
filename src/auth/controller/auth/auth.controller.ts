import { Body, Controller, Get, Param, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UserDTO } from 'src/users/dto/user.dto';
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authServices: AuthService
    ) {}
    @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, transform: true}))
    @Post("login")
    async login(@Body() loginData: any, @Req() req: Request, @Res() res: Response) {
        const result = await this.authServices.login(loginData, req, res)
        return result
    }

    @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, transform: true}))
    @Post("register")
    async register(@Body() registerData: UserDTO, @Req() req: Request, @Res() res: Response) {
        const result = await this.authServices.register(registerData, req, res)
        return result
    }
    @Post("reset-password/:token")
    async resetPassword(@Param('token') token: string, @Req() req: Request, @Res() res: Response) {
        const result = await this.authServices.resetPassword(token, req, res)
        return result
    }
    @Post("forgot-password")
    async forgotPassword(@Req() req: Request ,@Res() res: Response) {
        const result = await this.authServices.forgotPassword(req, res)
        return result
    }
    @Get("logout")
    async logout(@Res() res: Response) {
        const result = await this.authServices.logout(res)
        return result
    }

}

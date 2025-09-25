import { Injectable, Logger} from '@nestjs/common';
import { Request, Response } from 'express';
import ForgotPasswordUserService from 'src/auth/use-case/ForgotPassword';
import LoginUserService from 'src/auth/use-case/LoginService';
import LogoutUserService from 'src/auth/use-case/LogoutService';
import RegisterUserService from 'src/auth/use-case/RegisterService';
import ResetPasswordService from 'src/auth/use-case/ResetPasswordService';
import { UserDTO } from 'src/users/dto/user.dto';
import IAuthService from 'src/auth/interfaces/IAuthService';
import { LoginDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class AuthService implements IAuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private readonly registerService: RegisterUserService,
        private readonly loginService: LoginUserService,
        private readonly logoutService: LogoutUserService,
        private readonly forgotPasswordService: ForgotPasswordUserService,
        private readonly resetPasswordService: ResetPasswordService
    ) {}
    async register(registerData: UserDTO, req: Request, res: Response): Promise<any> {
        try {
            this.logger.debug("Registering user.")
            const result = await this.registerService.execute(registerData, req, res)
            this.logger.debug("Success")
            return result
        } catch(error) {
            this.logger.error(`Failed to register user ${error}`)
            throw error
        }
    }
    async login(loginData: LoginDTO, req: Request, res: Response): Promise<any> {
        try {
            this.logger.debug("Logging in.")
            const result = await this.loginService.execute(loginData, req, res)
            this.logger.debug("Success")
            return result
        } catch (error) {
            this.logger.error(`Failed to login: ${error}`)
            throw error
        }
    }
    async resetPassword(token: string, req: Request, res: Response): Promise<any> {
        try {
            this.logger.debug('Reset password.')
            const result = await this.resetPasswordService.execute(token, req, res)
            return result
        } catch (error) {
            this.logger.debug(`Error resetting password: ${error}`)
            throw error
        }
    }
    async forgotPassword(req: Request, res: Response): Promise<any> {
        try {
            this.logger.debug("Begin creating and sending reset URL")
            const result = await this.forgotPasswordService.execute(req, res)
            this.logger.debug("Success.")
            return result
        } catch (error) {
            this.logger.error(`Failed Forgot Password process: ${error}`)
            throw error
        }
    }
    async logout(res: Response): Promise<any> {
        try {
            this.logger.debug("Logging out.")
            const result = await this.logoutService.execute(res)
            return result
        } catch (error) {
            this.logger.error("Logged out successfully.")
            throw error
        }
    }
}

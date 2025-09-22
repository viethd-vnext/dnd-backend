import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { MailService } from 'src/auth/services/mail/mail.service';
import ForgotPasswordUserService from 'src/auth/use-case/ForgotPassword';
import LoginUserService from 'src/auth/use-case/LoginService';
import LogoutUserService from 'src/auth/use-case/LogoutService';
import RegisterUserService from 'src/auth/use-case/RegisterService';
import ResetPasswordService from 'src/auth/use-case/ResetPasswordService';
import { User } from 'src/entities/user.entity';
import TokenUtils from 'src/utils/TokenUtils';

@Module({
    imports: [TypeOrmModule.forFeature([User]), ConfigModule.forRoot({ isGlobal: true }),],
    
    providers: [
        AuthService,
        MailService,
        RegisterUserService,
        LoginUserService,
        LogoutUserService,
        ForgotPasswordUserService,
        ResetPasswordService,
        TokenUtils,
    ],
    exports: [AuthService, TokenUtils, MailService],
})
export class AuthModule {}

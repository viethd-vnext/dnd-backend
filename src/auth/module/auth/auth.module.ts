import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/guard/auth/auth.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { MailService } from 'src/auth/services/mail/mail.service';
import ForgotPasswordUserService from 'src/auth/use-case/ForgotPassword';
import LoginUserService from 'src/auth/use-case/LoginService';
import LogoutUserService from 'src/auth/use-case/LogoutService';
import RegisterUserService from 'src/auth/use-case/RegisterService';
import ResetPasswordService from 'src/auth/use-case/ResetPasswordService';
import { User } from 'src/users/entities/user.entity';
import TokenUtils from 'src/utils/TokenUtils';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    providers: [
        AuthGuard,
        AuthService,
        MailService,
        RegisterUserService,
        LoginUserService,
        LogoutUserService,
        ForgotPasswordUserService,
        ResetPasswordService,
        TokenUtils,
    ],
    exports: [AuthService, TokenUtils, MailService, AuthGuard],
})
export class AuthModule {}

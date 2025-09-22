import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { MailService } from "../services/mail/mail.service";

export default class ForgotPasswordUserService {
    private readonly logger = new Logger(ForgotPasswordUserService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
        private readonly mailService: MailService
    ) {}
    async execute(req: Request, res: Response) {
        this.logger.debug("Finding existing user")
        const user = await this.userRepository.findOne({ where: { email: req.body.email } })
        if (!user) {
             this.logger.error("User not found.")
            res.status(Number(this.configService.get<number>('STATUS_NOT_FOUND'))).json({message: "User not found."})
        }
        this.logger.debug("Creating reset token")
        const resetToken = user?.createPasswordResetToken()
        if (user) {
            await this.userRepository.save(user)
        }
        this.logger.debug("Attempting to create and send reset URL.")
        try {
            const resetURL = `${req.protocol}://${req.get('host')}/auth/resetpassword/${resetToken}`
            await this.mailService.send(user, resetURL, 'passwordReset', 'Deez')
            this.logger.debug("Success.")
            return res.status(Number(this.configService.get<number>('STATUS_OK'))).json({message: 'Password reset email sent successfully.', resetToken})
        } catch(error) {
            this.logger.error(`Forgot Password process failed: ${error}`)
            if (user) {
                user.passwordResetExpires = null
                user.passwordChangedAt = null
                await this.userRepository.save(user)
            }
             return res.status(Number(this.configService.get<number>('STATUS_SERVER_ERROR'))).json({error: error})
        }
    }
}
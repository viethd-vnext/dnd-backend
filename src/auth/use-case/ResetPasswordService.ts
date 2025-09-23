import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { MoreThan, Repository } from "typeorm";
import { Request, Response } from "express";
import * as crypto from 'crypto'
import TokenUtils from "src/utils/TokenUtils";
export default class ResetPasswordService {
    private readonly logger = new Logger(ResetPasswordService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
        private readonly tokenUtils: TokenUtils
    ) {}
    async execute(token: string, req: Request, res: Response) {
        this.logger.debug("Finding user with reset token")
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
        const user = await this.userRepository.findOne({
            where: {
                passwordResetToken: hashedToken,
                passwordResetExpires: MoreThan(new Date())
            }
        })
        this.logger.debug("Succeed. Saving new password.")
        if (!user) {
            this.logger.error('Invalid: No user found.')
            return res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST'))).json({message: "Token is invalid"})
        }
        user.password = req.body.password
        user.passwordConfirm = req.body.passwordConfirm
        user.passwordResetToken = ''
        user.passwordResetExpires = null
        await this.userRepository.save(user)
        const sendToken = await this.tokenUtils.createSendToken(user, req, res)
        return res.status(Number(this.configService.get<number>('STATUS_OK'))).json(sendToken)
    }
}
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
@Injectable()
export default class LogoutUserService {
    private readonly logger = new Logger(LogoutUserService.name)
    constructor (
        private readonly configService: ConfigService
    ) {}
    async execute(res: Response) {
        this.logger.debug("Expiring user's token.")
        res.cookie('jwt', 'logout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly:true
        })
        return res.status(Number(this.configService.get<number>("STATUS_OK"))).json({message: "Logged out successfully."})
    }
}
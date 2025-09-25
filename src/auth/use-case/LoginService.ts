import { Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { Request, Response } from "express"
import * as bcrypt from "bcryptjs"
import { UserDTO } from "src/users/dto/user.dto"
import { User } from "src/users/entities/user.entity"
import TokenUtils from "src/utils/TokenUtils"
import { Repository } from "typeorm"
import { LoginDTO } from "../dto/login.dto"

export default class LoginUserService {
    private readonly logger = new Logger(LoginUserService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
        private readonly tokenUtils: TokenUtils
    ) {}
    async execute(loginData: LoginDTO, req: Request, res: Response) {
        this.logger.debug("Finding existing user.")
        const {email, password} = loginData
        if (!email || !password) {
            return res.status(Number(this.configService.get("STATUS_BAD_REQUEST")) || 400).json({message: "Missing required fields."})
        }
        const user = await this.userRepository.findOne({
            where: {email},
            select: ['id','email','password']
        })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(Number(this.configService.get("STATUS_BAD_REQUEST")) || 400).json({message: "Incorrect email or password."})
        }
        const token = await this.tokenUtils.createSendToken(user, req, res)
        return res.status(Number(this.configService.get("STATUS_OK")) || 200).json({message: "successfully logged in", token})
    }
}
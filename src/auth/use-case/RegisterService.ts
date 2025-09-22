import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { UserDTO } from "src/dto/user.dto";
import { User } from "src/entities/user.entity";
import TokenUtils from "src/utils/TokenUtils";
import { Repository } from "typeorm";

export default class RegisterUserService {
    private readonly logger = new Logger(RegisterUserService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
        private readonly tokenUtils: TokenUtils
    ) {}
    async execute(registerData: UserDTO, req: Request, res: Response) {
        this.logger.debug("Checking if user exists.")
        const userExists = await this.userRepository.findOne({where: {email: registerData.email}})
        if (userExists) {
            this.logger.error("User already exists.")
            return res.status(Number(this.configService.get<number>("STATUS_BAD_REQUEST")) || 400).json("User already exists.")
        }
        if (!registerData.name || !registerData.email || !registerData.password || !registerData.passwordConfirm) {
            this.logger.error("Missing required fields.")
            return res.status(Number(this.configService.get<number>("STATUS_BAD_REQUEST")) || 400).json("Missing required fields.")
        }
        if (registerData.password !== registerData.passwordConfirm) {
            this.logger.error("Password does not match.")
            return res.status(Number(this.configService.get<number>("STATUS_BAD_REQUEST")) || 400).json("Password does not match.")
        }
        const { name, email, photo,role, password, passwordConfirm } = registerData;
        const user = this.userRepository.create({
            name,
            email,
            photo,
            role: role || "user",
            password,
            passwordConfirm
        })
        await this.userRepository.save(user)
        const token = await this.tokenUtils.createSendToken(user, req , res)
        this.logger.debug("Success.")
        return res.status(Number(this.configService.get<number>("STATUS_CREATED")) || 201).json({message: "User registered successfully.", token})
    }
}
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

export default class GetAllUsersService {
    private readonly logger = new Logger(GetAllUsersService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    async execute() {
        try{
            this.logger.debug("Begin fetching all users.")
            const result = await this.userRepository.find({where: {active:true}})
            this.logger.debug("Success.")
            return {message:"Succeed.", result: result}
        } catch (error) {
            this.logger.error(`Error fetching all users: ${error}`)
            throw error
        }
    }
}
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

export default class GetUserByIDService {
    private readonly logger = new Logger(GetUserByIDService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    async execute(id: number) {
        try {
            this.logger.debug(`Searching for user with ID ${id}`)
            const result = await this.userRepository.findOne({ where: { id: id, active: true } })
            return {message: "Succeed", result: result}
        } catch (error) {
            this.logger.error(`Error getting user ${id}: ${error}`)
            throw error;
        }
    }
}
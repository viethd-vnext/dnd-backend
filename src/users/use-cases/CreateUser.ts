import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

export default class CreateUserService {
    private readonly logger = new Logger(CreateUserService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    async execute(userData:any) {
        try {
            this.logger.debug("Saving user into database")
            const user = this.userRepository.create(userData)
            this.logger.debug("Success.")
            const save = await this.userRepository.save(user)
            return {message: "Success", result: save}
        } catch (error) {
            this.logger.debug(`Error creating user: ${error}`)
            throw error
        }
    }
}
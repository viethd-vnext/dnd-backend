import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

export default class DeleteUserService {
    private readonly logger = new Logger(DeleteUserService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async execute(id: string) {
        try {
            this.logger.debug(`Finding user with ID ${id}`)
            const exists = await this.userRepository.findOne({where: {id, active:true}})
            if (!exists) {
                this.logger.error(`Unable to find user with ${id}`)
                throw Error(`Cannot find user with ID ${id}`)
            }
            this.logger.debug(`User found, deleting`)
            return await this.userRepository.delete({ id, active: true })
        } catch (error) {
            this.logger.error(`Unable to delete user with ID ${id}`)
            throw error
        }
    }
}
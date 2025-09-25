import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

export default class UpdateUserService {
    private readonly logger = new Logger(UpdateUserService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async execute(id: string, patchData:any) {
        try {
            this.logger.debug(`Finding user with ID ${id}`)
            const exists = await this.userRepository.findOne({where: {id, active:true}})
            if (!exists) {
                this.logger.error(`Unable to find user with ${id}`)
                throw Error(`Cannot find user with ID ${id}`)
            }
            this.logger.debug(`Updating data on user with ID ${id}`)
            await this.userRepository.update(id, patchData)
            this.logger.debug(`Updated.`)
        } catch (error) {
            this.logger.error(`Error updating user with ID ${id}`)
            throw error;
        }
    }
}
import { Injectable, Logger } from '@nestjs/common';
import { UserDTO } from 'src/users/dto/user.dto';
import { UserUpdateDTO } from 'src/auth/dto/login.dto';
import IUsersService from 'src/users/interfaces/IUsersService';
import CreateUserService from 'src/users/use-cases/CreateUser';
import DeleteUserService from 'src/users/use-cases/DeleteUser';
import GetAllUsersService from 'src/users/use-cases/GetAllUsers';
import GetUserByIDService from 'src/users/use-cases/GetUserById';
import UpdateUserService from 'src/users/use-cases/UpdateUser';
@Injectable()
export class UsersService implements IUsersService  {
    private readonly logger = new Logger(UsersService.name)
    constructor(
        private readonly getAllUsersService: GetAllUsersService,
        private readonly createUserService: CreateUserService,
        private readonly getUserByIDService: GetUserByIDService,
        private readonly deleteuserByIDService: DeleteUserService,
        private readonly updateUserByIDService: UpdateUserService
    ) {}
    async getAllUsers(): Promise<any> {
        try {
            this.logger.debug("Getting all users.")
            return await this.getAllUsersService.execute()
        } catch (error) {
            throw error;
        }
    }
    async createUser(userData: UserDTO): Promise<any> {
        try {
            this.logger.debug("Creating user.")
            return await this.createUserService.execute(userData)
        }
        catch (error) {
            this.logger.error(`Error creating user ${error}`)
            throw error;
        }
    }
    async getUserByID(id: string): Promise<any> {
        try {
            this.logger.debug("Getting user.")
            return await this.getUserByIDService.execute(id)
        } catch(error) {
            this.logger.error(`Error gettng user by ID.`)
            throw error;
        }
    }
    async updateUser(id:string, patchData: UserUpdateDTO): Promise<void> {
        try {
            this.logger.debug("Deleting user.")
            await this.updateUserByIDService.execute(id, patchData)
            this.logger.debug("Completed.")
        } catch (error) {
            this.logger.error(`Error deleting user.`)
        }
    }
    async deleteUser(id:string): Promise<void> {
        try {
            this.logger.debug("Deleting user.")
            await this.deleteuserByIDService.execute(id)
            this.logger.debug("Completed.")
        } catch (error) {
            this.logger.error(`Error deleting user.`)
        }
    }
}

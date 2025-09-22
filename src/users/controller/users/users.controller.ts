import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UserUpdateDTO } from 'src/dto/login.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userServices: UsersService) {}
    
    @Get()
    async getAllUsers() {
        return await this.userServices.getAllUsers()
    }

    @UsePipes(new ValidationPipe({
            forbidNonWhitelisted: true,
            transform: true
        }))
    @Post()
    async createUser(@Body() userData: UserDTO) {
        return await this.userServices.createUser(userData)
    }
    @Get(":id")
    async getUserByID(@Param("id") id: string) {
        return await this.userServices.getUserByID(id)
    }
    @Patch(":id")
    async updateUser(@Param("id") id:string, @Body() patchData: UserUpdateDTO) {
        return await this.userServices.updateUser(id, patchData)
    }
    @Delete(":id")
    async deleteUser(@Param("id") id:string) {
        return await this.userServices.deleteUser(id)
    }
}

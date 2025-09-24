import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UserUpdateDTO } from 'src/dto/login.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { UserGuard } from 'src/users/guard/user/user.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userServices: UsersService) {}
    
    @Get()
    @UseGuards(UserGuard)
    async getAllUsers() {
        return await this.userServices.getAllUsers()
    }
    @UseGuards(UserGuard)
    @UsePipes(new ValidationPipe({
            forbidNonWhitelisted: true,
            transform: true
        }))
    @Post()
    async createUser(@Body() userData: UserDTO) {
        return await this.userServices.createUser(userData)
    }
    @UseGuards(UserGuard)
    @Get(":id")
    async getUserByID(@Param("id") id: string) {
        return await this.userServices.getUserByID(id)
    }
    @UseGuards(UserGuard)
    @Patch(":id")
    async updateUser(@Param("id") id:string, @Body() patchData: UserUpdateDTO) {
        return await this.userServices.updateUser(id, patchData)
    }
    @UseGuards(UserGuard)
    @Delete(":id")
    async deleteUser(@Param("id") id:string) {
        return await this.userServices.deleteUser(id)
    }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users/users.service';
import CreateUserService from 'src/users/use-cases/CreateUser';
import DeleteUserService from 'src/users/use-cases/DeleteUser';
import GetAllUsersService from 'src/users/use-cases/GetAllUsers';
import GetUserByIDService from 'src/users/use-cases/GetUserById';
import UpdateUserService from 'src/users/use-cases/UpdateUser';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UsersService, 
        GetAllUsersService, 
        CreateUserService, 
        GetUserByIDService, 
        DeleteUserService,
        UpdateUserService
    ],
    exports: [UsersService],
})
export class UsersModule {}

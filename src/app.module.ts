import { Module } from '@nestjs/common';
import { UsersModule } from './users/module/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './users/controller/users/users.controller';
import { UsersService } from './users/services/users/users.service';
import { AuthModule } from './auth/module/auth/auth.module';
import { AuthController } from './auth/controller/auth/auth.controller';
import { AuthService } from './auth/services/auth/auth.service';
import { MailService } from './auth/services/mail/mail.service';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config) => ({
        type: config.get('DB_TYPE'),
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    AuthModule
  ],
  controllers: [UsersController, AuthController],
  providers: [MailService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/module/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './users/controller/users/users.controller';
import { AuthModule } from './auth/module/auth/auth.module';
import { AuthController } from './auth/controller/auth/auth.controller';
import { MailService } from './auth/services/mail/mail.service';
import { SheetModule } from './sheet/module/sheet/sheet.module';
import { SheetController } from './sheet/controller/sheet/sheet.controller';
import { DatabaseModule } from './external/database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    AuthModule,
    SheetModule,
    DatabaseModule
  ],
  controllers: [UsersController, AuthController, SheetController],
  providers: [MailService],
})
export class AppModule {}

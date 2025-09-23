import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterAffinity } from 'src/entities/affinity.entity';
import { CharacterSheet } from 'src/entities/sheet.entity';
import { User } from 'src/entities/user.entity';
import { SheetService } from 'src/sheet/services/sheet/sheet.service';
import CreateSheetService from 'src/sheet/use-cases/CreateSheet';
import DamageService from 'src/sheet/use-cases/Damage';
import DeleteSheetService from 'src/sheet/use-cases/DeleteSheet';
import GetAllSheetService from 'src/sheet/use-cases/GetAllSheet';
import GetSheetByIDService from 'src/sheet/use-cases/GetSheetByID';
import ModifySheetService from 'src/sheet/use-cases/ModifySheet';

@Module({
    imports: [TypeOrmModule.forFeature([User, CharacterSheet, CharacterAffinity]), ConfigModule.forRoot({ isGlobal: true })],
    providers: [
        SheetService, 
        CreateSheetService,
        ModifySheetService,
        DeleteSheetService,
        GetAllSheetService,
        GetSheetByIDService,
        DamageService
    ],
    exports: [SheetService],
})
export class SheetModule {}

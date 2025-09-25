import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterAffinity } from 'src/sheet/entities/affinity.entity';
import { CharacterSheet } from 'src/sheet/entities/sheet.entity';
import { User } from 'src/users/entities/user.entity';
import { SheetService } from 'src/sheet/services/sheet/sheet.service';
import AddTempHPService from 'src/sheet/use-cases/AddTempHP';
import CreateSheetService from 'src/sheet/use-cases/CreateSheet';
import DamageService from 'src/sheet/use-cases/Damage';
import DeleteSheetService from 'src/sheet/use-cases/DeleteSheet';
import GetAllSheetService from 'src/sheet/use-cases/GetAllSheet';
import GetOwnedSheetService from 'src/sheet/use-cases/GetOwnedSheets';
import GetSheetByIDService from 'src/sheet/use-cases/GetSheetByID';
import HealService from 'src/sheet/use-cases/Heal';
import ModifySheetService from 'src/sheet/use-cases/ModifySheet';
import ChangeAffinityService from 'src/sheet/use-cases/ChangeAffinity';

@Module({
    imports: [TypeOrmModule.forFeature([User, CharacterSheet, CharacterAffinity]), ConfigModule.forRoot({ isGlobal: true })],
    providers: [
        SheetService, 
        CreateSheetService,
        ModifySheetService,
        DeleteSheetService,
        GetAllSheetService,
        GetSheetByIDService,
        DamageService,
        GetOwnedSheetService,
        HealService,
        AddTempHPService,
        ChangeAffinityService
    ],
    exports: [SheetService],
})
export class SheetModule {}

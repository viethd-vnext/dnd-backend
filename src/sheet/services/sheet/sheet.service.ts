import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { DamageDTO } from 'src/dto/damage.dto';
import { CreateCharacterSheetDTO } from 'src/dto/sheet.dto';
import { SheetUpdateDTO } from 'src/dto/sheetUpdate.dto';
import ISheetService from 'src/interfaces/ISheetService';
import CreateSheetService from 'src/sheet/use-cases/CreateSheet';
import DamageService from 'src/sheet/use-cases/Damage';
import DeleteSheetService from 'src/sheet/use-cases/DeleteSheet';
import GetAllSheetService from 'src/sheet/use-cases/GetAllSheet';
import GetSheetByIDService from 'src/sheet/use-cases/GetSheetByID';
import ModifySheetService from 'src/sheet/use-cases/ModifySheet';

@Injectable()
export class SheetService implements ISheetService {
    constructor(
        private readonly createSheetService: CreateSheetService,
        private readonly modifySheetService: ModifySheetService,
        private readonly deleteSheetService: DeleteSheetService,
        private readonly getAllSheetService: GetAllSheetService,
        private readonly getSheetByIDService: GetSheetByIDService,
        private readonly damageService: DamageService
    ) {}
    async getOwnedSheet(res: Response): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async getAllSheet(res: Response): Promise<any> {
        try {
            const result = await this.getAllSheetService.execute(res)
            return result
        } catch (error) {
            throw error
        }
    }
    async getSheetByID(characterID: string, res: Response): Promise<any> {
        try {
            const result = await this.getSheetByIDService.execute(characterID, res)
            return result
        } catch (error) {
            throw error
        }
    }
    async createSheet(sheetData: CreateCharacterSheetDTO, req: Request, res: Response): Promise<any> {
        try {
            const result = await this.createSheetService.execute(sheetData, req, res)
            return result
        } catch (error) {
            throw error
        }
    }
    async modifySheet(characterID: string, updateData: SheetUpdateDTO, res: Response): Promise<any> {
        try {
            const result = await this.modifySheetService.execute(characterID, updateData, res)
            return result
        } catch (error) {
            throw error
        }
    }
    async deleteSheet(characterID: string, res: Response): Promise<any> {
        try {
            const result = await this.deleteSheetService.execute(characterID, res)
            return result
        } catch (error) {
            throw error
        }
    }
    async damage(characterID: string, damageData: DamageDTO, res: Response): Promise<any> {
         try {
            const result = await this.damageService.execute(characterID, damageData, res)
            return result
        } catch (error) {
            throw error
        }
    }
    async heal(characterID: string, res: Response): Promise<any> {
        throw new Error('Method not implemented.')
    }
    async addTempHP(characterID: string, res: Response): Promise<any> {
        throw new Error('Method not implemented.')
    }
}

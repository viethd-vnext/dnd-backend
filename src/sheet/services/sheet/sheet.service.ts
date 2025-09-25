import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { AffinityDTO } from 'src/sheet/dto/affinity.dto';
import { DamageDTO } from 'src/sheet/dto/damage.dto';
import { CreateCharacterSheetDTO } from 'src/sheet/dto/sheet.dto';
import { SheetUpdateDTO } from 'src/sheet/dto/sheetUpdate.dto';
import ISheetService from 'src/sheet/interfaces/ISheetService';
import AddTempHPService from 'src/sheet/use-cases/AddTempHP';
import ChangeAffinityService from 'src/sheet/use-cases/ChangeAffinity';
import CreateSheetService from 'src/sheet/use-cases/CreateSheet';
import DamageService from 'src/sheet/use-cases/Damage';
import DeleteSheetService from 'src/sheet/use-cases/DeleteSheet';
import GetAllSheetService from 'src/sheet/use-cases/GetAllSheet';
import GetOwnedSheetService from 'src/sheet/use-cases/GetOwnedSheets';
import GetSheetByIDService from 'src/sheet/use-cases/GetSheetByID';
import HealService from 'src/sheet/use-cases/Heal';
import ModifySheetService from 'src/sheet/use-cases/ModifySheet';

@Injectable()
export class SheetService implements ISheetService {
    constructor(
        private readonly createSheetService: CreateSheetService,
        private readonly modifySheetService: ModifySheetService,
        private readonly deleteSheetService: DeleteSheetService,
        private readonly getAllSheetService: GetAllSheetService,
        private readonly getSheetByIDService: GetSheetByIDService,
        private readonly damageService: DamageService,
        private readonly getOwnedSheetService: GetOwnedSheetService,
        private readonly healService: HealService,
        private readonly addTempHPService: AddTempHPService,
        private readonly changeAffinityService: ChangeAffinityService
    ) {}
    async getOwnedSheet(req: Request ,res: Response): Promise<any> {
        try {
            const result = await this.getOwnedSheetService.execute(req, res)
            return result
        } catch (error) {
            throw error
        }
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
    async modifySheet(characterID: string, updateData: SheetUpdateDTO, req: Request, res: Response): Promise<any> {
        try {
            const result = await this.modifySheetService.execute(characterID, updateData, req, res)
            return result
        } catch (error) {
            throw error
        }
    }
    async deleteSheet(characterID: string, req: Request, res: Response): Promise<any> {
        try {
            const result = await this.deleteSheetService.execute(characterID, req, res)
            return result
        } catch (error) {
            throw error
        }
    }
    async damage(characterID: string, damageData: DamageDTO,req: Request, res: Response): Promise<any> {
         try {
            const result = await this.damageService.execute(characterID, damageData, req, res)
            return result
        } catch (error) {
            throw error
        }
    }
    async heal(characterID: string, healData: any, req: Request, res: Response): Promise<any> {
        try {
            const result = await this.healService.execute(characterID,healData, req,res)
            return result
        } catch (error) {
            throw error
        }
    }
    async addTempHP(characterID: string, healData: any, req: Request, res: Response): Promise<any> {
        try {
            const result = await this.addTempHPService.execute(characterID, healData, req, res)
            return result
        } catch (error) {
            throw error
        }
    }
    async changeAffinity(characterID: string, affinityData: AffinityDTO, req: Request, res: Response): Promise<any>  {
        try {
            const result = await this.changeAffinityService.execute(characterID, affinityData,req,res)
            return result
        } catch (error) {
            throw error
        }
    }
}

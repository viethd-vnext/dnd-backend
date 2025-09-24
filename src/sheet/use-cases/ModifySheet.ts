import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { SheetUpdateDTO } from "src/sheet/dto/sheetUpdate.dto";
import { CharacterSheet } from "../entities/sheet.entity";
import { Repository } from "typeorm";

@Injectable()
export default class ModifySheetService {
    private readonly logger = new Logger(ModifySheetService.name)
    constructor(
        @InjectRepository(CharacterSheet)
        private readonly sheetRepository: Repository<CharacterSheet>,
        private readonly configService: ConfigService
    ) {}
    async execute(characterID: string, sheetData: SheetUpdateDTO, req: Request, res: Response) {
        try {
            const userID = req.user?.id
            const sheet = await this.sheetRepository.findOne(
                {where: 
                    {
                        id: characterID,
                        userID: userID
                    }})
            if (!sheet) {
                this.logger.error('Sheet not found')
                return res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST'))).json({
                    message: "Sheet not found."
                });
            }
            this.logger.debug("Updating sheet")
            const result = await this.sheetRepository.update({ id: characterID }, sheetData)
            return res.status(Number(this.configService.get<number>('STATUS_OK'))).json({message: "Updated successfully", result})
        } catch (error) {
            this.logger.error(`Failed to update sheet ${error}`)
            throw error
        }
    }
}
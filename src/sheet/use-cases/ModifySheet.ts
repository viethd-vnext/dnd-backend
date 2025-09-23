import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { SheetUpdateDTO } from "src/dto/sheetUpdate.dto";
import { CharacterSheet } from "src/entities/sheet.entity";
import { Repository } from "typeorm";

@Injectable()
export default class ModifySheetService {
    private readonly logger = new Logger(ModifySheetService.name)
    constructor(
        @InjectRepository(CharacterSheet)
        private readonly sheetRepository: Repository<CharacterSheet>,
        private readonly configService: ConfigService
    ) {}
    async execute(characterID: string, sheetData: SheetUpdateDTO, res: Response) {
        try {
            this.logger.debug("Updating sheet")
            const result = await this.sheetRepository.update({ id: characterID }, sheetData)
            return res.status(Number(this.configService.get<number>('STATUS_OK'))).json({message: "Updated successfully", result})
        } catch (error) {
            this.logger.error(`Failed to update sheet ${error}`)
            throw error
        }
    }
}
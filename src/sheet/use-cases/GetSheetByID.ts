import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { Response } from "express"
import { CharacterSheet } from "src/entities/sheet.entity"
import { Repository } from "typeorm"

@Injectable()
export default class GetSheetByIDService {
    private readonly logger = new Logger(GetSheetByIDService.name)
    constructor(
        @InjectRepository(CharacterSheet)
        private readonly sheetRepository: Repository<CharacterSheet>,
        private readonly configService: ConfigService
    ) {}
    async execute(characterID: string, res: Response) {
        try {
            this.logger.debug(`Finding sheet by ID: ${characterID}`)
            const result = await this.sheetRepository.findOne({where: {id: characterID}})
            return res.status(Number(this.configService.get<number>('STATUS_OK'))).json({message: "Successfully fetched requested sheet.", result})
        } catch (error) {
            this.logger.error(`Failed to fetch requested sheet: ${error}`)
            throw error
        }
    }
}
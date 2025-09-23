import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { Response } from "express"
import { CharacterSheet } from "src/entities/sheet.entity"
import { Repository } from "typeorm"

@Injectable()
export default class GetAllSheetService {
    private readonly logger = new Logger(GetAllSheetService.name)
    constructor(
        @InjectRepository(CharacterSheet)
        private readonly sheetRepository: Repository<CharacterSheet>,
        private readonly configService: ConfigService
    ) {}
    async execute(res: Response) {
        try {
            this.logger.debug("Fetching all sheets")
            const result = await this.sheetRepository.find({where: {active: true}})
            return res.status(Number(this.configService.get<number>('STATUS_OK'))).json({message: "Successfully fetched all sheets", result})
        } catch (error) {
            this.logger.error(`Failed to fetch all sheets ${error}`)
            throw error
        }
    }
}
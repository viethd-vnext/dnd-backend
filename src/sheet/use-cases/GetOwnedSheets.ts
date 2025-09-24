import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { Request, Response } from "express"
import { CharacterSheet } from "src/entities/sheet.entity"
import { Repository } from "typeorm"

@Injectable()
export default class GetOwnedSheetService {
    private readonly logger = new Logger(GetOwnedSheetService.name)
    constructor(
        @InjectRepository(CharacterSheet)
        private readonly sheetRepository: Repository<CharacterSheet>,
        private readonly configService: ConfigService
    ) {}
    async execute(req: Request, res: Response) {
        try {
            this.logger.debug(`Finding all sheets under userID: ${req.user?.id}`)
            const result = await this.sheetRepository.find({where: {userID: req.user?.id}})
            return res.status(Number(this.configService.get<number>('STATUS_OK'))).json({message: "Successfully fetched requested sheet.", result})
        } catch (error) {
            this.logger.error(`Failed to fetch requested sheet: ${error}`)
            throw error
        }
    }
}
import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { Request, Response } from "express"
import { CharacterAffinity } from "src/entities/affinity.entity"
import { CharacterSheet } from "src/entities/sheet.entity"
import { Repository } from "typeorm"

@Injectable()
export default class DeleteSheetService {
    private readonly logger = new Logger(DeleteSheetService.name)
    constructor(
        @InjectRepository(CharacterSheet)
        private readonly sheetRepository: Repository<CharacterSheet>,
        @InjectRepository(CharacterAffinity)
        private readonly affinityRepository: Repository<CharacterAffinity>,
        private readonly configService: ConfigService
    ) {}
    async execute(characterID: string, req: Request, res: Response) {
        try {
            const userID = req.user?.id
            this.logger.debug("Finding and removing sheet")
            if (!await this.sheetRepository.findOne({where: {id: characterID, userID: userID}})) {
                return res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST'))).json({message: "No sheet found with this ID."})
            }
            const affinity = await this.affinityRepository.delete({characterID: characterID})
            const result = await this.sheetRepository.delete({ id: characterID })
            return res.status(Number(this.configService.get<number>('STATUS_OK'))).json({message: "Deleted successfully", result, affinity})
        } catch (error) {
            this.logger.error(`Failed to update sheet ${error}`)
            throw error
        }
    }
}
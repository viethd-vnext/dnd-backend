import { Inject, Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { Request, Response } from "express"
import { CreateCharacterSheetDTO } from "src/dto/sheet.dto"
import { CharacterAffinity } from "src/entities/affinity.entity"
import { CharacterSheet } from "src/entities/sheet.entity"
import { User } from "src/entities/user.entity"
import { In, Repository } from "typeorm"

@Injectable()
export default class CreateSheetService {
    private readonly logger = new Logger(CreateSheetService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
        @InjectRepository(CharacterSheet)
        private readonly sheetRepository: Repository<CharacterSheet>,
        @InjectRepository(CharacterAffinity)
        private readonly affinityRepository: Repository<CharacterAffinity>
    ) {}
    async execute(sheetData: CreateCharacterSheetDTO, req: Request, res: Response) {
        console.log('Request headers:', req.headers);
        try {
            this.logger.debug("Creating character sheet.")
            const sheet = this.sheetRepository.create({
                ...sheetData,
            })
            this.logger.debug("Character sheet successfully created.")
            const saveSheet = await this.sheetRepository.save(sheet)
            this.logger.debug("Creating affinity chart for sheet.")
            const affinity = this.affinityRepository.create({
                character: sheet,
                characterID: sheet.id
            })
            const saveAffinity = await this.affinityRepository.save(affinity)
            return res.status(Number(this.configService.get<number>('STATUS_CREATED'))).json({message: "Character sheet successfully created.", saveSheet, saveAffinity})
        } catch (error) {
            this.logger.debug(`Error creating character sheet: ${error}`)
            throw error
        }
    }
}
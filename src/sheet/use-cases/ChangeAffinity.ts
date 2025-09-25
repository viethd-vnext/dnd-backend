import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CharacterSheet } from "../entities/sheet.entity"
import { Request, Response } from "express"
import { CharacterAffinity } from "../entities/affinity.entity"
import { AffinityDTO } from "../dto/affinity.dto"

@Injectable()
export default class ChangeAffinityService {
    private readonly logger = new Logger(ChangeAffinityService.name)
    constructor(
        @InjectRepository(CharacterAffinity)
        private readonly affinityRepository: Repository<CharacterAffinity>,
        @InjectRepository(CharacterSheet)
        private readonly sheetRepository: Repository<CharacterSheet>,
        private readonly configService: ConfigService
    ) {}
    async execute(characterID: string, affinityData: AffinityDTO, req: Request, res: Response) {
        try {
            this.logger.debug(`Checking sheet's existance.`)
            const userID = req.user?.id
            const sheet = await this.sheetRepository.findOne(
                {where: {id: characterID, userID: userID}})
            if (!sheet) {
                return res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST'))).json({
                    message: "Sheet not found or belongs to someone else."
                })
            }
            this.logger.debug(`Success. Checking if affinity sheet exists for character.`)
            const affinitySheet = await this.affinityRepository.findOne({
                where: { characterID: characterID}
            })
            if (!affinitySheet) {
                return res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST'))).json({
                    message: "Sheet not found or belongs to someone else."
                })
            }
            this.logger.debug(`Success. Updating affinity for character.`)
            const { state, type } = affinityData
            const updateObject: Partial<CharacterAffinity> = {}
            updateObject[type] = state
            const update = await this.affinityRepository.update({characterID:characterID},updateObject)
            return res.status(Number(this.configService.get<number>('STATUS_OK'))).json({
                    message: "Affinity updated successfully.",
                    update
                })
            } catch (error) {
                this.logger.error(`Error updating affinity: ${error}`);
                throw error;
            }
        }
    }

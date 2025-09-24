import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { CharacterSheet } from "src/entities/sheet.entity";
import { Repository } from "typeorm";

@Injectable()
export default class HealService {
    private readonly logger = new Logger(HealService.name)
    constructor(
        @InjectRepository(CharacterSheet)
        private readonly sheetRepository: Repository<CharacterSheet>,
        private readonly configService: ConfigService
    ) {}
    async execute(characterID: string, healData: any, req: Request, res: Response) {
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
            if (typeof healData.amount !== "number" || !healData.amount) {
                this.logger.error(`Not a proper request body.`)
                return res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST'))).json({
                message: `Not a proper request body.`
            })
            }
            if (!sheet ) {
                this.logger.error(`Character ${characterID} not found.`)
                return res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST'))).json({
                message: `Character ${characterID} not found.`,
            })
            }
            if (sheet.hp + healData.amount > sheet.maxHP) {
                sheet.hp = sheet.maxHP
            }
            if (sheet.hp + healData.amount < sheet.maxHP) {
                sheet.hp += healData.amount
            }
            const result = await this.sheetRepository.update(
                {id: characterID},
                {hp: sheet.hp}
            )
            return res.status(Number(this.configService.get<number>('STATUS_OK'))).json({
                message: "Successfully healed.",
                result
            })
        } catch (error) {
            this.logger.error(`Failed to heal character: ${error}`)
            throw error;
        }
    }
}
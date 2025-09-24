import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { CharacterSheet } from "src/entities/sheet.entity";
import { Repository } from "typeorm";

@Injectable()
export default class AddTempHPService {
    private readonly logger = new Logger(AddTempHPService.name)
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
            if (!healData || !healData.amount) {
                this.logger.error('Not a proper request body')
                return res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST'))).json({
                    message: "Not a proper request body."
                });
            }
            if (sheet.tempHP < healData.amount) {
                sheet.tempHP = healData.amount
                await this.sheetRepository.update({ id: characterID, userID: userID }, { tempHP: sheet.tempHP })
            }
            return res.status(Number(this.configService.get<number>('STATUS_OK'))).json({
                message: "Successfully added temporary HP.",
            })

        } catch (error) {
            this.logger.error('Failed to add temporary HP.')
            throw error;
        } 
    }
}
import { Injectable, Logger } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { Response } from "express"
import { applyMixins } from "rxjs/internal/util/applyMixins"
import { DamageDTO } from "src/dto/damage.dto"
import { CharacterAffinity } from "src/entities/affinity.entity"
import { CharacterSheet } from "src/entities/sheet.entity"
import { Repository } from "typeorm"

@Injectable()
export default class DamageService {
    private readonly logger = new Logger(DamageService.name)
    constructor(
        @InjectRepository(CharacterSheet)
        private readonly sheetRepository: Repository<CharacterSheet>,
        @InjectRepository(CharacterAffinity)
        private readonly affinityRepository: Repository<CharacterAffinity>,
        private readonly configService: ConfigService
    ) {}
    async execute(characterID: string, damageData: DamageDTO, res: Response) {
        try {
            const sheet = await this.sheetRepository.findOne({where: {id: characterID}})
            if (!sheet) {
                this.logger.error('Sheet not found')
                return res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST'))).json({
                    message: "Sheet not found."
                });
            }
            let hp = sheet.hp;
            let tempHP = sheet.tempHP;
            const { amount, type } = damageData;
            const affinity = await this.affinityRepository.findOne({ where: { characterID: sheet.id } });
            if (!affinity) {
                this.logger.error("Affinity data not found.")
                return res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST'))).json({
                    message: "Affinity data not found."
                });
            }
            const status = affinity[type]
            let trueAmount = amount
            if (status === "resistant") {
                trueAmount = amount / 2
            } else if (status === "vulnerable") {
                trueAmount = amount * 2
            } else if (status === "immune") {
                trueAmount = 0;
            }
            const result = await this.damageCalculation(hp, tempHP, trueAmount)
            if (result.hp <0) { result.hp =0 }
            await this.sheetRepository.update(
                { id: characterID },
                {
                    hp: result.hp,
                    tempHP: result.tempHP
                }
            );
            return res.status(Number(this.configService.get<number>('STATUS_OK'))).json({
                message: `Damage applied. Affinity for ${type}: ${status}`,
                originalAmount: amount,
                appliedAmount: trueAmount,
                hp: result.hp,
                tempHP: result.tempHP,
                affinity: status
            });
        } catch (error) {
            this.logger.error(`Failed to process damage: ${error}`)
            return res.status(500).json({ message: "Failed to process damage", error: error.message });
        }
    }
    async damageCalculation(hp:number, tempHP:number, amount:number) {
        if (tempHP-amount >0) {
            tempHP = tempHP-amount
        } 
        if (tempHP-amount < 0) {
            hp = hp+tempHP-amount
            tempHP = 0;
        }
        if (tempHP-amount === 0) {
            tempHP=0;
        }
        return {hp, tempHP,amount}
    }
}
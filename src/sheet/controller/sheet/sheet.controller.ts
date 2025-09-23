import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { DamageDTO } from 'src/dto/damage.dto';
import { CreateCharacterSheetDTO } from 'src/dto/sheet.dto';
import { SheetUpdateDTO } from 'src/dto/sheetUpdate.dto';
import { SheetService } from 'src/sheet/services/sheet/sheet.service';

@Controller('sheet')
export class SheetController {
    logger: any;
    constructor(
        private readonly sheetService: SheetService) {}
    @Get('owned')
    //@UseGuards(AuthGuard)
    async getOwnedSheet(@Res() res: Response) {
        const result = this.sheetService.getOwnedSheet(res)
        return result
    }
    @Get('all')
    //@UseGuards(AuthGuard)
    async getAllSheet(@Res() res: Response) {
        const result = this.sheetService.getAllSheet(res)
        return result
    }
    @Post()
    async createSheet(@Body() sheetData: CreateCharacterSheetDTO, @Req() req: Request, @Res() res: Response) {
        console.log(req.header, req.body)
        const result = await this.sheetService.createSheet(sheetData, req, res);
        return result;
    }
    @Post('damage/:id')
    //@UseGuards(AuthGuard)
    async damage(@Param('id') characterID: string, @Body() damageData:DamageDTO, @Res() res: Response) {
        const result = this.sheetService.damage(characterID, damageData, res)
        return result
    }
    @Post('heal/:id')
    //@UseGuards(AuthGuard)
    async heal(@Param('id') characterID: string, @Res() res: Response) {
        const result = this.sheetService.heal(characterID, res)
        return result
    }
    @Post('add-temp-hp/:id')
    //@UseGuards(AuthGuard)
    async addTempHP(@Param('id') characterID: string, @Res() res: Response) {
        const result = this.sheetService.addTempHP(characterID, res)
        return result
    }
    @Patch(':id')
    //@UseGuards(AuthGuard)
    async modifySheet(@Param('id') characterID: string,@Body() updateData: SheetUpdateDTO, @Res() res: Response) {
        const result = this.sheetService.modifySheet(characterID, updateData, res)
        return result
    }
    @Get('/:id')
    //@UseGuards(AuthGuard)
    async getSheetByID(@Param('id') characterID: string, @Res() res: Response) {
        const result = this.sheetService.getSheetByID(characterID, res)
        return result
    }
    @Delete(':id')
    //@UseGuards(AuthGuard)
    async deleteSheet(@Param('id') characterID: string, @Res() res: Response) {
        const result = this.sheetService.deleteSheet(characterID, res)
        return result
    }
}

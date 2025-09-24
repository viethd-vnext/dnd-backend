import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/guard/auth/auth.guard';
import { DamageDTO } from 'src/sheet/dto/damage.dto';
import { CreateCharacterSheetDTO } from 'src/sheet/dto/sheet.dto';
import { SheetUpdateDTO } from 'src/sheet/dto/sheetUpdate.dto';
import { SheetService } from 'src/sheet/services/sheet/sheet.service';

@Controller('sheet')
export class SheetController {
    logger: any;
    constructor(
        private readonly sheetService: SheetService) {}
    @Get('owned')
    @UseGuards(AuthGuard)
    async getOwnedSheet(@Req() req: Request, @Res() res: Response) {
        const result = this.sheetService.getOwnedSheet(req, res)
        return result
    }
    @Get('all')
    @UseGuards(AuthGuard)
    async getAllSheet(@Res() res: Response) {
        const result = this.sheetService.getAllSheet(res)
        return result
    }
    @Post()
    @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, transform: true}))
    @UseGuards(AuthGuard)
    async createSheet(@Body() sheetData: CreateCharacterSheetDTO, @Req() req: Request, @Res() res: Response) {
        const result = await this.sheetService.createSheet(sheetData, req, res);
        return result;
    }
    @Post('damage/:id')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, transform: true}))
    async damage(@Param('id') characterID: string, @Req() req: Request, @Body() damageData:DamageDTO, @Res() res: Response) {
        const result = this.sheetService.damage(characterID, damageData, req, res)
        return result
    }
    @Post('heal/:id')
    @UseGuards(AuthGuard)
    async heal(@Param('id') characterID: string, @Body() healData: any, @Req() req: Request, @Res() res: Response) {
        const result = this.sheetService.heal(characterID, healData, req, res)
        return result
    }
    @Post('add-temp-hp/:id')
    @UseGuards(AuthGuard)
    async addTempHP(@Param('id') characterID: string, @Body() healData: any, @Req() req: Request, @Res() res: Response) {
        const result = this.sheetService.addTempHP(characterID, healData, req, res)
        return result
    }
    @Patch(':id')
    @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, transform: true}))
    @UseGuards(AuthGuard)
    async modifySheet(@Param('id') characterID: string,@Body() updateData: SheetUpdateDTO, @Req() req: Request, @Res() res: Response) {
        const result = this.sheetService.modifySheet(characterID, updateData, req, res)
        return result
    }
    @Get('/:id')
    @UseGuards(AuthGuard)
    async getSheetByID(@Param('id') characterID: string, @Res() res: Response) {
        const result = this.sheetService.getSheetByID(characterID, res)
        return result
    }
    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteSheet(@Param('id') characterID: string, @Req() req: Request, @Res() res: Response) {
        const result = this.sheetService.deleteSheet(characterID, req, res)
        return result
    }
}

export default interface ISheetService {
    getOwnedSheet(res): Promise<any>
    getAllSheet(res):Promise<any>
    getSheetByID(characterID, res): Promise<any>
    createSheet(sheetData,req, res): Promise<any>
    modifySheet(characterData, id, res):Promise<any>
    deleteSheet(id, res):Promise<any>
    damage(characterID, damageData, res):Promise<any>
    heal(characterID, res):Promise<any>
    addTempHP(characterID, res): Promise<any>

}
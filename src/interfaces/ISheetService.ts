export default interface ISheetService {
    getOwnedSheet(req, res): Promise<any>
    getAllSheet(res):Promise<any>
    getSheetByID(characterID, res): Promise<any>
    createSheet(sheetData,req, res): Promise<any>
    modifySheet(characterData, id, req, res):Promise<any>
    deleteSheet(id, req, res):Promise<any>
    damage(characterID, damageData, req, res):Promise<any>
    heal(characterID, healData, req, res):Promise<any>
    addTempHP(characterID, healData, req, res): Promise<any>

}
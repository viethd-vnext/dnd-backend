export default interface IUsersService {
    getAllUsers(): Promise<any>
    createUser(userData):Promise<any>
    getUserByID(id):Promise<any>
    updateUser(id, patchData):Promise<void>
    deleteUser(id):Promise<void>
}
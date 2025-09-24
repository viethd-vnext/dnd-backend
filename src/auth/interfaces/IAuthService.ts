export default interface IAuthService {
    register(registerData, req, res): Promise<any>
    login(loginData, req, res):Promise<any>
    resetPassword(token, req, res):Promise<any>
    forgotPassword(data, res):Promise<any>
    logout(res):Promise<any>
}
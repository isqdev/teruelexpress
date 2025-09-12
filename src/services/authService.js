import BaseService from "./baseService";

class AuthService extends BaseService{

    constructor(){
        super("/auth");
    }

    async login(data){
        const resposta = this.api.post(`${this.endPoint}/login`, data);
        return resposta;
    }
}

export default AuthService;
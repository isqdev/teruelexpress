import BaseService from "./baseService";

class AuthService extends BaseService{

    constructor(){
        super("/auth");
    }

    async login(dados){
        const resposta = this.api.post(`${this.endPoint}/login`, dados);
        return resposta;
    }

    async getInfo(){
        const resposta = this.api.get(`${this.endPoint}/home`);
        return resposta;
    }
}

export default AuthService;
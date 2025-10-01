import BaseService from "./BaseService";

class RecoverService extends BaseService {

    constructor() {
        super("/codigo");
    }

    async gerarCodigo(data) {
        const resposta = this.api.post(`${this.endPoint}/gerar`, data);
        return resposta;
    }

    async validarCodigo(data) {
        const resposta = this.api.post(`${this.endPoint}/validar`, data);
        return resposta;
    }
}

export default RecoverService;
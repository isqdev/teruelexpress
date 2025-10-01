import BaseService from "./BaseService";

class RecoverPessoaService extends BaseService {

    constructor() {
        super("/pessoa");
    }

    async atualizarSenha(data) {
        const resposta = this.api.post(`${this.endPoint}/atualizar-senha/{email}`, data);
        return resposta;
    }
}

export default RecoverPessoaService;
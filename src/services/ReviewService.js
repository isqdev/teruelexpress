import BaseService from "./BaseService";

class ReviewService extends BaseService {
    constructor() {
        super("/avaliacoes")
    }

    async findAllByPessoaId(){
        const resultado = await this.api.get(`${this.endPoint}/clientes`);
        return resultado;
    }
}

export default ReviewService;
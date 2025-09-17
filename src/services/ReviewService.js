import BaseService from "./BaseService";

class ReviewService extends BaseService {
    constructor() {
        super("/avaliacoes")
    }

    async findAllByPessoaId(page){
        const resultado = await this.api.get(`${this.endPoint}/clientes?size=6&page=${page}&sort=id,asc`);
        return resultado;
    }


}

export default ReviewService;
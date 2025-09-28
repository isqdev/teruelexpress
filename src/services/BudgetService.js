import BaseService from "./BaseService";

class BudgetService extends BaseService {
    constructor() {
        super("solicitacoes")
    }

    async findAllClient(page) {
        const resultado = await this.api.get(`${this.endPoint}/client?size=10&page=${page}&sort=id,desc`);
        console.log(resultado);
        return resultado;
    }
}

export default BudgetService;
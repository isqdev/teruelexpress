const data = [
  {
    id: 1,
    status: "recusado",
    data: "10/05/2024",
    origem: "Rio de Janeiro",
    destino: "São Paulo",
    cancelar: "X"
  },
  {
    id: 2,
    status: "aceito",
    data: "27/06/2024",
    origem: "Curitiba",
    destino: "Belo Horizonte"
  },
  {
    id: 3,
    status: "pendente",
    data: "09/06/2024",
    origem: "Salvador",
    destino: "Porto Alegre",
  },
  {
    id: 4,
    status: "recusado",
    data: "18/06/2023",
    origem: "Reci ",
    destino: "Brasília",
  },
  {
    id: 5,
    status: "pendente",
    data: "20/06/2024",
    origem: "Florianópolis",
    destino: "Fortaleza",
  },
  {
    id: 6,
    status: "aceito",
    data: "02/07/2024",
    origem: "Manaus",
    destino: "Belém",
  },
  {
    id: 7,
    status: "pendente",
    data: "15/07/2024",
    origem: "Goiânia",
    destino: "Natal",
  },
  {
    id: 8,
    status: "recusado",
    data: "28/05/2024",
    origem: "Campo Grande",
    destino: "João Pessoa",
  },
  {
    id: 9,
    status: "aceito",
    data: "05/06/2025",
    origem: "Vitória",
    destino: "Maceió",
  },
];

export interface SolicitacoesResponse {
  id: number;
  status: string;
  data: string;
  origem: string;
  destino: string;
}

export function setInfo(info?: any): void {
    info ? localStorage.setItem("solicitacoes", JSON.stringify(info)) : localStorage.setItem("solicitacoes", JSON.stringify(data));
}

export function getInfo(): SolicitacoesResponse[] | null {
    const solicitacoes = localStorage.getItem("solicitacoes");
    return solicitacoes ? JSON.parse(solicitacoes) : null;
}

export function updateInfo(id: number): SolicitacoesResponse[] | null {
    const stored = getInfo();
    const updated = stored ? stored.filter(item => item.id !== id) : null; 
    setInfo(updated);
    return updated;
}

export function getOriginDestiny(id: number): string | null{
    const stored = getInfo();
    const row = stored ? stored[id] : null;
    return row ? `${row.origem}/${row.destino}` : null;
}
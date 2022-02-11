export class Vaga {
  id: any;
  nome: any;
  foto: any;
  descricao: any;
  salario: any;

  constructor(
    id: number,
    nome: string,
    foto: string,
    descricao: string,
    salario: number
  ) {
    this.id = id;
    this.nome = nome;
    this.foto = foto;
    this.descricao = descricao;
    this.salario = salario;
  }
}

import { CarrinhosProdutosDTO } from '../../carrinhosprodutos/dto/carrinhosprodutosDTO.dto';

export class CarrinhosDTO {
  id: number;
  usuarioId: number;
  produtos: CarrinhosProdutosDTO[];
  dataCriacao: Date;
  dataAtualizacao: Date;
}

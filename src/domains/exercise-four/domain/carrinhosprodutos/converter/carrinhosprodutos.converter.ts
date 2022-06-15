import { Carrinhos } from '../../carrinhos/entity/carrinhos.entity';
import { Produtos } from '../../produtos/entity/produtos.entity';
import { CarrinhosProdutosDTO } from '../dto/carrinhosprodutosDTO.dto';
import { CarrinhosProdutos } from '../entity/carrinhosprodutos.entity';

export class CarrinhosProdutosConverter {
  toEntity(dto: CarrinhosProdutosDTO): CarrinhosProdutos {
    const entity = new CarrinhosProdutos();
    const produto = new Produtos();
    const carrinho = new Carrinhos();

    entity.id = dto.id;
    entity.quantidade = dto.quantidade;
    carrinho.id = dto.carrinhoId;
    entity.carrinho = carrinho;
    produto.id = dto.produtoId;
    entity.produto = produto;

    return entity;
  }

  toDTO(entity: CarrinhosProdutos): CarrinhosProdutosDTO {
    const dto = new CarrinhosProdutosDTO();

    dto.id = entity.id;
    dto.quantidade = entity.quantidade;
    dto.produtoId = entity.produto.id;
    dto.carrinhoId = entity.carrinho.id;
    dto.dataCriacao = entity.createdDate;
    dto.dataAtualizacao = entity.updateDate;

    return dto;
  }

  toDTOsAndCount(
    entities: [CarrinhosProdutos[], number],
  ): [CarrinhosProdutosDTO[], number] {
    return [this.entityToDTO(entities[0]), entities[1]];
  }

  entityToDTO(entities: CarrinhosProdutos[]) {
    return entities.map((entity) => this.toDTO(entity));
  }
}

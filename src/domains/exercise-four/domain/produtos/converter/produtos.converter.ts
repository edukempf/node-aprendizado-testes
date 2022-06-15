import { ProdutosDTO } from '../dto/produtosDTO.dto';
import { Produtos } from '../entity/produtos.entity';

export class ProdutosConverter {
  toEntity(dto: ProdutosDTO): Produtos {
    const entity = new Produtos();

    entity.id = dto.id;
    entity.nome = dto.nome;
    entity.valor = dto.valor;

    return entity;
  }

  toDTO(entity: Produtos): ProdutosDTO {
    const dto = new ProdutosDTO();

    dto.id = entity.id;
    dto.nome = entity.nome;
    dto.valor = entity.valor;
    dto.dataCriacao = entity.createdDate;
    dto.dataAtualizacao = entity.updateDate;

    return dto;
  }

  toDTOsAndCount(entities: [Produtos[], number]): [ProdutosDTO[], number] {
    return [this.entityToDTO(entities[0]), entities[1]];
  }

  entityToDTO(entities: Produtos[]) {
    return entities.map((entity) => this.toDTO(entity));
  }
}

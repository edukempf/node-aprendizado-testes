import { CarrinhosProdutosConverter } from '../../carrinhosprodutos/converter/carrinhosprodutos.converter';
import { Usuarios } from '../../usuarios/entity/usuarios.entity';
import { CarrinhosDTO } from '../dto/carrinhosDTO.dto';
import { Carrinhos } from '../entity/carrinhos.entity';

export class CarrinhosConverter {
  private carrinhoProdutosConverter: CarrinhosProdutosConverter;

  constructor() {
    this.carrinhoProdutosConverter = new CarrinhosProdutosConverter();
  }

  toEntity(dto: CarrinhosDTO): Carrinhos {
    const entity = new Carrinhos();
    const usuario = new Usuarios();

    entity.id = dto.id;
    usuario.id = dto.usuarioId;
    entity.usuario = usuario;
    const carrinhosProdutos = dto.produtos.map((carrinhoProduto) => {
      return this.carrinhoProdutosConverter.toEntity(carrinhoProduto);
    });
    entity.carrinhosProdutos = carrinhosProdutos;

    return entity;
  }

  toDTO(entity: Carrinhos): CarrinhosDTO {
    const dto = new CarrinhosDTO();

    dto.id = entity.id;
    dto.usuarioId = entity.usuario.id;
    dto.produtos = entity.carrinhosProdutos.map((carrinhoProduto) =>
      this.carrinhoProdutosConverter.toDTO(carrinhoProduto),
    );
    dto.dataCriacao = entity.createdDate;
    dto.dataAtualizacao = entity.updateDate;

    return dto;
  }

  toDTOsAndCount(entities: [Carrinhos[], number]): [CarrinhosDTO[], number] {
    return [this.entityToDTO(entities[0]), entities[1]];
  }

  entityToDTO(entities: Carrinhos[]) {
    return entities.map((entity) => this.toDTO(entity));
  }
}

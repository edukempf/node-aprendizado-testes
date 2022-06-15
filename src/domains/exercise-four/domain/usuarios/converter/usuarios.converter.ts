import { UsuariosDTO } from '../dto/usuariosDTO.dto';
import { Usuarios } from '../entity/usuarios.entity';

export class UsuariosConverter {
  toEntity(dto: UsuariosDTO): Usuarios {
    const entity = new Usuarios();

    entity.id = dto.id;
    entity.nome = dto.nome;
    entity.cep = dto.cep;

    return entity;
  }

  toDTO(entity: Usuarios): UsuariosDTO {
    const dto = new UsuariosDTO();

    dto.id = entity.id;
    dto.nome = entity.nome;
    dto.cep = entity.cep;
    dto.dataCriacao = entity.createdDate;
    dto.dataAtualizacao = entity.updateDate;

    return dto;
  }

  toDTOsAndCount(entities: [Usuarios[], number]): [UsuariosDTO[], number] {
    return [this.entityToDTO(entities[0]), entities[1]];
  }

  entityToDTO(entities: Usuarios[]) {
    return entities.map((entity) => this.toDTO(entity));
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UsuariosConverter } from '../converter/usuarios.converter';
import { UsuariosDTO } from '../dto/usuariosDTO.dto';
import { UsuariosRepository } from '../repository/usuarios.repository';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuariosRepository)
    private repository: UsuariosRepository,
    private converter: UsuariosConverter,
  ) {}

  async findOneByID(id: number): Promise<UsuariosDTO> {
    const findUsuarios = await this.repository.findOne({ where: { id } });

    if (!findUsuarios) {
      throw new NotFoundException('Usuario não Encontrado!');
    }

    const dto = this.converter.toDTO(findUsuarios);
    return dto;
  }
}

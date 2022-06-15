import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProdutosConverter } from '../converter/produtos.converter';
import { ProdutosDTO } from '../dto/produtosDTO.dto';
import { ProdutosRepository } from '../repository/produtos.repository';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(ProdutosRepository)
    private repository: ProdutosRepository,
    private converter: ProdutosConverter,
  ) {}

  async findOneByID(id: number): Promise<ProdutosDTO> {
    const findProdutos = await this.repository.findOne({ where: { id } });

    if (!findProdutos) {
      throw new NotFoundException('Produto não Encontrado!');
    } else {
      const dto = this.converter.toDTO(findProdutos);
      return dto;
    }
  }
}

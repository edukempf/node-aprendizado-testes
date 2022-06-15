import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProdutosService } from '../../produtos/service/produtos.service';

import { CarrinhosProdutosConverter } from '../converter/carrinhosprodutos.converter';
import { CarrinhosProdutosDTO } from '../dto/carrinhosprodutosDTO.dto';
import { CarrinhosProdutosRepository } from '../repository/carrinhosprodutos.repository';

@Injectable()
export class CarrinhosProdutosService {
  constructor(
    @InjectRepository(CarrinhosProdutosRepository)
    private repository: CarrinhosProdutosRepository,
    private converter: CarrinhosProdutosConverter,
    private produtoService: ProdutosService,
  ) {}

  async findOneByID(id: number): Promise<CarrinhosProdutosDTO> {
    const carrinhoProduto = await this.repository.findOne({ where: { id } });

    if (!carrinhoProduto) {
      throw new NotFoundException('CarrinhoProduto não Encontrado!');
    }

    return this.converter.toDTO(carrinhoProduto);
  }

  async update(
    carrinhosProdutosDto: CarrinhosProdutosDTO,
  ): Promise<UpdateResult> {
    if (carrinhosProdutosDto.quantidade <= 0) {
      throw new PreconditionFailedException('Quantidade inválida!');
    }

    const dto = await this.findOneByID(carrinhosProdutosDto.id);
    dto.quantidade = carrinhosProdutosDto.quantidade;
    dto.produtoId = carrinhosProdutosDto.produtoId;

    return this.repository.update(dto.id, this.converter.toEntity(dto));
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findOneByID(id);

    return this.repository.delete(id);
  }

  async create(
    carrinhosProdutos: CarrinhosProdutosDTO,
  ): Promise<CarrinhosProdutosDTO> {
    if (carrinhosProdutos.quantidade <= 0) {
      throw new BadRequestException('Quantidade inválida!');
    }

    await this.produtoService.findOneByID(carrinhosProdutos.produtoId);

    return this.converter.toDTO(
      await this.repository.save(this.converter.toEntity(carrinhosProdutos)),
    );
  }
}

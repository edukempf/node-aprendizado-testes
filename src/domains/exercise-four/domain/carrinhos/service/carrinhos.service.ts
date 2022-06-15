import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosService } from '../../usuarios/service/usuarios.service';

import { CarrinhosConverter } from '../converter/carrinhos.converter';
import { CarrinhosDTO } from '../dto/carrinhosDTO.dto';
import { CarrinhosRepository } from '../repository/carrinhos.repository';
import { Carrinhos } from '../entity/carrinhos.entity';
import { ProdutosService } from '../../produtos/service/produtos.service';
import { CarrinhosProdutosService } from '../../carrinhosprodutos/service/carrinhosprodutos.service';
import { CarrinhosProdutosConverter } from '../../carrinhosprodutos/converter/carrinhosprodutos.converter';
import { CorreiosService } from '../../api-correios/service/correios.service';

const VALOR_FRETE_GRATIS = 100;

@Injectable()
export class CarrinhosService {
  constructor(
    @InjectRepository(CarrinhosRepository)
    private repository: CarrinhosRepository,
    private converter: CarrinhosConverter,
    private usuarioService: UsuariosService,
    private produtoService: ProdutosService,
    private carrinhosProdutosService: CarrinhosProdutosService,
    private carrinhosProdutosConverter: CarrinhosProdutosConverter,
    private correiosService: CorreiosService,
  ) {}

  async findCarrinhoByUserID(usuarioId: number): Promise<Carrinhos> {
    const carrinho = await this.repository.findOne({
      relations: {
        carrinhosProdutos: true,
        usuario: true,
      },
      where: {
        usuario: {
          id: usuarioId,
        },
      },
    });

    if (!carrinho) {
      return null;
    }

    return carrinho;
  }

  async findOneByID(id: number): Promise<CarrinhosDTO> {
    const carrinho = await this.repository.findOne({
      where: { id },
      relations: {
        carrinhosProdutos: true,
        usuario: true,
      },
    });

    if (!carrinho) {
      throw new NotFoundException('Carrinho não Encontrado!');
    }

    const dto = this.converter.toDTO(carrinho);

    return dto;
  }

  async manage(carrinhoDTO: CarrinhosDTO): Promise<CarrinhosDTO> {
    const usuario = await this.usuarioService.findOneByID(
      carrinhoDTO.usuarioId,
    );

    const validacoesProdutoPromise = carrinhoDTO.produtos.map(
      (produtoCarrinho) =>
        this.produtoService.findOneByID(produtoCarrinho.produtoId),
    );

    await Promise.all(validacoesProdutoPromise);

    const carrinho = await this.findCarrinhoByUserID(usuario.id);

    if (!carrinho) {
      return this.converter.toDTO(
        await this.repository.save(this.converter.toEntity(carrinhoDTO)),
      );
    }

    const carrinhoProdutosExistentes = carrinho.carrinhosProdutos;

    const updatesDeletesPromises = carrinhoProdutosExistentes.map(
      (carrinhoProdutoExistente) => {
        const toUpdate = carrinhoDTO.produtos.find(
          (carrinhoProdutosDto) =>
            carrinhoProdutosDto.id === carrinhoProdutoExistente.id,
        );

        if (toUpdate) {
          carrinhoProdutoExistente.produto.id = toUpdate.produtoId;
          carrinhoProdutoExistente.quantidade = toUpdate.quantidade;
          return this.carrinhosProdutosService.update(
            this.carrinhosProdutosConverter.toDTO(carrinhoProdutoExistente),
          );
        }

        return this.carrinhosProdutosService.delete(
          carrinhoProdutoExistente.id,
        );
      },
    );
    await Promise.all(updatesDeletesPromises);

    const insertPromises = carrinhoDTO.produtos
      .filter((carrinhoProdutoDto) => !carrinhoProdutoDto.id)
      .map((carrinhoProdutoDto) => {
        return this.carrinhosProdutosService.create({
          ...carrinhoProdutoDto,
          carrinhoId: carrinho.id,
        });
      });
    await Promise.all(insertPromises);

    return this.findOneByID(carrinho.id);
  }

  async calcularValoresCarrinho(carrinhoId: number) {
    const carrinho = await this.findOneByID(carrinhoId);

    const valorProdutosPromises = carrinho.produtos.map(
      async (carrinhoProdutoDTO) => {
        const produto = await this.produtoService.findOneByID(
          carrinhoProdutoDTO.produtoId,
        );
        return carrinhoProdutoDTO.quantidade * produto.valor;
      },
    );

    const valoresProdutos = await Promise.all(valorProdutosPromises);

    const valorTotalProdutos = valoresProdutos.reduce(
      (acc, valorProduto) => acc + valorProduto,
      0,
    );

    if (valorTotalProdutos > VALOR_FRETE_GRATIS) {
      return {
        valorTotalProdutos,
        valorFrete: 0,
        valorTotalComFrete: valorTotalProdutos,
      };
    }

    const usuario = await this.usuarioService.findOneByID(carrinho.usuarioId);

    const valorFrete = this.correiosService.findValuePerCEP(usuario.cep);

    return {
      valorTotalProdutos,
      valorFrete,
      valorTotalComFrete: valorTotalProdutos + valorFrete,
    };
  }
}

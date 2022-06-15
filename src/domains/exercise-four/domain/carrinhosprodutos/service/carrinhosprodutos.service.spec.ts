import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Carrinhos } from '../../carrinhos/entity/carrinhos.entity';
import { ProdutosConverter } from '../../produtos/converter/produtos.converter';
import { Produtos } from '../../produtos/entity/produtos.entity';
import { ProdutosRepository } from '../../produtos/repository/produtos.repository';
import { ProdutosService } from '../../produtos/service/produtos.service';
import { Usuarios } from '../../usuarios/entity/usuarios.entity';

import { CarrinhosProdutosConverter } from '../converter/carrinhosprodutos.converter';
import { CarrinhosProdutosDTO } from '../dto/carrinhosprodutosDTO.dto';
import { CarrinhosProdutos } from '../entity/carrinhosprodutos.entity';
import { CarrinhosProdutosRepository } from '../repository/carrinhosprodutos.repository';
import { CarrinhosProdutosService } from './carrinhosprodutos.service';

describe('Testando os metodos da ProdutosService', () => {
  let service: CarrinhosProdutosService;

  const usuarioMock: Usuarios = {
    id: 8,
    nome: 'Kempf',
    cep: '87301190',
    createdDate: new Date('2022-04-01:00:00-03:00'),
    updateDate: new Date('2022-04-01:00:00-03:00'),
  };

  const produtoMock: Produtos = {
    id: 3,
    nome: 'Refrigerante',
    valor: 50,
    createdDate: new Date('2022-06-01:00:00-03:00'),
    updateDate: new Date('2022-06-01:00:00-03:00'),
  };

  const carrinhoBaseMock: Carrinhos = {
    id: 1,
    createdDate: new Date('2022-06-01:00:00-03:00'),
    updateDate: new Date('2022-06-01:00:00-03:00'),
    usuario: usuarioMock,
  };

  const carrinhoProdutoMock: CarrinhosProdutos = {
    id: 2,
    createdDate: new Date('2022-06-01:00:00-03:00'),
    updateDate: new Date('2022-06-01:00:00-03:00'),
    produto: produtoMock,
    quantidade: 3,
    carrinho: carrinhoBaseMock,
  };

  const deleteUpdateResultMock = {
    affected: 1,
  };

  const repositoryMock = {
    findOne: jest.fn(),
    update: jest.fn(() => deleteUpdateResultMock),
    delete: jest.fn(() => deleteUpdateResultMock),
    save: jest.fn(() => carrinhoProdutoMock),
  };

  const produtoServiceMock = {
    findOneByID: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CarrinhosProdutosService,
        CarrinhosProdutosConverter,
        ProdutosConverter,
        ProdutosRepository,
        { provide: CarrinhosProdutosRepository, useValue: repositoryMock },
        { provide: ProdutosService, useValue: produtoServiceMock },
      ],
    }).compile();

    service = moduleRef.get(CarrinhosProdutosService);
  });

  afterEach(() => {
    repositoryMock.findOne.mockClear();
  });

  it('Service está definido', () => {
    expect(service).toBeDefined();
  });

  it('findOneByID() - deveria Buscar um registro pelo id', async () => {
    repositoryMock.findOne.mockReturnValueOnce(carrinhoProdutoMock);

    const resp = await service.findOneByID(2);

    expect(resp.id).toBe(2);
    expect(resp.carrinhoId).toEqual(1);
    expect(resp.produtoId).toEqual(3);
    expect(resp.quantidade).toEqual(3);
    expect(resp.dataCriacao).toEqual(new Date('2022-06-01:00:00-03:00'));
    expect(resp.dataAtualizacao).toEqual(new Date('2022-06-01:00:00-03:00'));
  });

  it('findOneByID() - deveria retornar uma exceção de CarrinhoProduto não Encontrado', async () => {
    expect(service.findOneByID(999)).rejects.toThrow(
      new BadRequestException('CarrinhoProduto não Encontrado!'),
    );
  });

  it('create() - deveria criar um registro', async () => {
    repositoryMock.findOne.mockReturnValueOnce(carrinhoProdutoMock);
    produtoServiceMock.findOneByID.mockReturnValueOnce(jest.fn());
    const dto = new CarrinhosProdutosDTO();
    dto.produtoId = 3;
    dto.quantidade = 2;

    const resp = await service.create(dto);

    expect(resp.id).toBe(2);
    expect(resp.carrinhoId).toEqual(1);
    expect(resp.produtoId).toEqual(3);
    expect(resp.quantidade).toEqual(3);
    expect(resp.dataCriacao).toEqual(new Date('2022-06-01:00:00-03:00'));
    expect(resp.dataAtualizacao).toEqual(new Date('2022-06-01:00:00-03:00'));
  });

  it('create() - deveria retornar uma exceção de Quantidade inválida', async () => {
    const dto = new CarrinhosProdutosDTO();
    dto.produtoId = 3;
    dto.quantidade = -2;

    expect(service.create(dto)).rejects.toThrow(
      new BadRequestException('Quantidade inválida!'),
    );
  });

  it('update() - deveria atualizar um registro', async () => {
    repositoryMock.findOne.mockReturnValueOnce(carrinhoProdutoMock);
    const dto = new CarrinhosProdutosDTO();
    dto.produtoId = 3;
    dto.quantidade = 2;

    const resp = await service.update(dto);

    expect(resp.affected).toBe(1);
  });

  it('update() - deveria retornar uma exceção de Quantidade inválida', async () => {
    const dto = new CarrinhosProdutosDTO();
    dto.produtoId = 3;
    dto.quantidade = -2;

    expect(service.update(dto)).rejects.toThrow(
      new BadRequestException('Quantidade inválida!'),
    );
  });

  it('delete() - deveria deletar um registro', async () => {
    repositoryMock.findOne.mockReturnValueOnce(jest.fn());
    const resp = await service.delete(1);
    expect(resp.affected).toBe(1);
  });
});

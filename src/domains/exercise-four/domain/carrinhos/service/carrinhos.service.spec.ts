import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CorreiosService } from '../../api-correios/service/correios.service';
import { CarrinhosProdutosConverter } from '../../carrinhosprodutos/converter/carrinhosprodutos.converter';
import { CarrinhosProdutosRepository } from '../../carrinhosprodutos/repository/carrinhosprodutos.repository';
import { CarrinhosProdutosService } from '../../carrinhosprodutos/service/carrinhosprodutos.service';
import { ProdutosConverter } from '../../produtos/converter/produtos.converter';
import { Produtos } from '../../produtos/entity/produtos.entity';
import { ProdutosRepository } from '../../produtos/repository/produtos.repository';
import { ProdutosService } from '../../produtos/service/produtos.service';
import { UsuariosConverter } from '../../usuarios/converter/usuarios.converter';
import { Usuarios } from '../../usuarios/entity/usuarios.entity';
import { UsuariosRepository } from '../../usuarios/repository/usuarios.repository';
import { UsuariosService } from '../../usuarios/service/usuarios.service';

import { CarrinhosConverter } from '../converter/carrinhos.converter';
import { CarrinhosDTO } from '../dto/carrinhosDTO.dto';
import { Carrinhos } from '../entity/carrinhos.entity';
import { CarrinhosRepository } from '../repository/carrinhos.repository';
import { CarrinhosService } from './carrinhos.service';

describe('Testando os metodos da CarrinhosService', () => {
  let service: CarrinhosService;

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

  const carrinhoProdutoMock = {
    id: 2,
    createdDate: new Date('2022-06-01:00:00-03:00'),
    updateDate: new Date('2022-06-01:00:00-03:00'),
    produto: produtoMock,
    quantidade: 3,
    carrinho: carrinhoBaseMock,
  };

  const carrinhosMock: Carrinhos = {
    id: 1,
    createdDate: new Date('2022-06-01:00:00-03:00'),
    updateDate: new Date('2022-06-01:00:00-03:00'),
    usuario: usuarioMock,
    carrinhosProdutos: [carrinhoProdutoMock],
  };

  const carrinhoComFreteMock: Carrinhos = {
    id: 1,
    createdDate: new Date('2022-06-01:00:00-03:00'),
    updateDate: new Date('2022-06-01:00:00-03:00'),
    usuario: usuarioMock,
    carrinhosProdutos: [
      {
        ...carrinhoProdutoMock,
        quantidade: 1,
      },
    ],
  };

  const carrinhoProdutoDtoMock = {
    id: 2,
    produtoId: 3,
    carrinhoId: 1,
    quantidade: 3,
    dataCriacao: new Date('2022-06-01:00:00-03:00'),
    dataAtualizacao: new Date('2022-06-01:00:00-03:00'),
  };

  const deleteUpdateResultMock = {
    affected: 1,
  };

  const repositoryMock = {
    findOne: jest.fn(),
    save: jest.fn(() => carrinhosMock),
  };

  const usuariosServiceMock = {
    findOneByID: jest.fn(),
  };

  const produtosServiceMock = {
    findOneByID: jest.fn(),
  };

  const carrinhosProdutosServiceMock = {
    findOneByID: jest.fn(),
    delete: jest.fn(() => deleteUpdateResultMock),
    update: jest.fn(() => deleteUpdateResultMock),
    create: jest.fn(() => carrinhoProdutoDtoMock),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CarrinhosService,
        CarrinhosConverter,
        ProdutosService,
        CarrinhosProdutosConverter,
        CarrinhosProdutosRepository,
        CorreiosService,
        ProdutosConverter,
        ProdutosRepository,
        UsuariosRepository,
        UsuariosConverter,
        {
          provide: CarrinhosProdutosService,
          useValue: carrinhosProdutosServiceMock,
        },
        { provide: ProdutosService, useValue: produtosServiceMock },
        { provide: UsuariosService, useValue: usuariosServiceMock },
        { provide: CarrinhosRepository, useValue: repositoryMock },
      ],
    }).compile();

    service = moduleRef.get(CarrinhosService);
  });

  afterEach(() => {
    repositoryMock.findOne.mockClear();
    usuariosServiceMock.findOneByID.mockClear();
  });

  it('Service está definido', () => {
    expect(service).toBeDefined();
  });

  it('findOneByID() - deveria Buscar um registro pelo id', async () => {
    repositoryMock.findOne.mockReturnValueOnce(carrinhosMock);

    const resp = await service.findOneByID(1);

    expect(resp.id).toBe(1);
    expect(resp.usuarioId).toEqual(8);
    expect(resp.produtos[0].id).toEqual(2);
    expect(resp.produtos[0].produtoId).toEqual(3);
    expect(resp.dataCriacao).toEqual(new Date('2022-06-01:00:00-03:00'));
    expect(resp.dataAtualizacao).toEqual(new Date('2022-06-01:00:00-03:00'));
  });

  it('findOneByID() - deveria retornar uma exceção de Carrinho não Encontrado', async () => {
    expect(service.findOneByID(999)).rejects.toThrow(
      new BadRequestException('Carrinho não Encontrado!'),
    );
  });

  it('findCarrinhoByUserID() - deveria Buscar um registro pelo id do usuario', async () => {
    repositoryMock.findOne.mockReturnValueOnce(carrinhosMock);

    const resp = await service.findCarrinhoByUserID(8);

    expect(resp.id).toBe(1);
    expect(resp.usuario.id).toEqual(8);
    expect(resp.carrinhosProdutos[0].id).toEqual(2);
    expect(resp.carrinhosProdutos[0].produto.id).toEqual(3);
    expect(resp.createdDate).toEqual(new Date('2022-06-01:00:00-03:00'));
    expect(resp.updateDate).toEqual(new Date('2022-06-01:00:00-03:00'));
  });

  it('findCarrinhoByUserID() - deveria deveria retornar null para um carrinho inexistente', async () => {
    const resp = await service.findCarrinhoByUserID(999);

    expect(resp).toBeNull();
  });

  it('manage() - deveria criar um carrinho para um usuário que ainda não possui um carrinho', async () => {
    usuariosServiceMock.findOneByID.mockReturnValueOnce(carrinhosMock);
    produtosServiceMock.findOneByID.mockReturnValueOnce(produtoMock);
    repositoryMock.findOne.mockReturnValueOnce(null);

    const carrinhoDTO = new CarrinhosDTO();
    carrinhoDTO.usuarioId = 8;
    carrinhoDTO.produtos = [
      {
        produtoId: 3,
        quantidade: 3,
      },
    ];

    const resp = await service.manage(carrinhoDTO);
    expect(resp.id).toBe(1);
    expect(resp.usuarioId).toEqual(8);
    expect(resp.produtos[0].id).toEqual(2);
    expect(resp.produtos[0].produtoId).toEqual(3);
    expect(resp.dataCriacao).toEqual(new Date('2022-06-01:00:00-03:00'));
    expect(resp.dataAtualizacao).toEqual(new Date('2022-06-01:00:00-03:00'));
  });

  it('manage() - deveria atualizar um carrinho removendo e adicionando um item para um usuário que ainda já possui um carrinho', async () => {
    usuariosServiceMock.findOneByID.mockReturnValueOnce(usuarioMock);
    produtosServiceMock.findOneByID.mockReturnValueOnce(produtoMock);
    repositoryMock.findOne.mockReturnValue(carrinhosMock);

    const carrinhoDTO = new CarrinhosDTO();
    carrinhoDTO.usuarioId = 8;
    carrinhoDTO.produtos = [
      {
        produtoId: 3,
        quantidade: 3,
      },
    ];

    const resp = await service.manage(carrinhoDTO);
    expect(resp.id).toBe(1);
    expect(resp.usuarioId).toEqual(8);
    expect(resp.produtos[0].id).toEqual(2);
    expect(resp.produtos[0].produtoId).toEqual(3);
    expect(resp.dataCriacao).toEqual(new Date('2022-06-01:00:00-03:00'));
    expect(resp.dataAtualizacao).toEqual(new Date('2022-06-01:00:00-03:00'));
  });

  it('manage() - deveria atualizar um carrinho atualizando um item para um usuário que ainda já possui um carrinho', async () => {
    usuariosServiceMock.findOneByID.mockReturnValueOnce(usuarioMock);
    produtosServiceMock.findOneByID.mockReturnValueOnce(produtoMock);
    repositoryMock.findOne.mockReturnValue(carrinhosMock);

    const carrinhoDTO = new CarrinhosDTO();
    carrinhoDTO.usuarioId = 8;
    carrinhoDTO.produtos = [
      {
        id: 2,
        produtoId: 3,
        quantidade: 3,
      },
    ];

    const resp = await service.manage(carrinhoDTO);
    expect(resp.id).toBe(1);
    expect(resp.usuarioId).toEqual(8);
    expect(resp.produtos[0].id).toEqual(2);
    expect(resp.produtos[0].produtoId).toEqual(3);
    expect(resp.dataCriacao).toEqual(new Date('2022-06-01:00:00-03:00'));
    expect(resp.dataAtualizacao).toEqual(new Date('2022-06-01:00:00-03:00'));
  });

  it('calcularValoresCarrinho() - deveria calcular frete gratuito', async () => {
    usuariosServiceMock.findOneByID.mockReturnValueOnce(usuarioMock);
    produtosServiceMock.findOneByID.mockReturnValueOnce(produtoMock);
    repositoryMock.findOne.mockReturnValue(carrinhosMock);

    const resp = await service.calcularValoresCarrinho(1);
    expect(resp.valorFrete).toBe(0);
    expect(resp.valorTotalComFrete).toEqual(150);
    expect(resp.valorTotalProdutos).toEqual(150);
  });

  it('calcularValoresCarrinho() - deveria calcular frete pago', async () => {
    usuariosServiceMock.findOneByID.mockReturnValueOnce(usuarioMock);
    produtosServiceMock.findOneByID.mockReturnValueOnce(produtoMock);
    repositoryMock.findOne.mockReturnValue(carrinhoComFreteMock);

    const resp = await service.calcularValoresCarrinho(1);
    expect(resp.valorFrete).toBe(50);
    expect(resp.valorTotalComFrete).toEqual(100);
    expect(resp.valorTotalProdutos).toEqual(50);
  });
});

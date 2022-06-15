import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { ProdutosConverter } from '../converter/produtos.converter';
import { Produtos } from '../entity/produtos.entity';
import { ProdutosRepository } from '../repository/produtos.repository';
import { ProdutosService } from './produtos.service';

describe('Testando os metodos da ProdutosService', () => {
  let service: ProdutosService;

  const produtosMock: Produtos = {
    id: 1,
    nome: 'Refrigerante',
    valor: 500,
    createdDate: new Date('2022-05-01:00:00-03:00'),
    updateDate: new Date('2022-05-01:00:00-03:00'),
  };

  const repositoryMock = {
    findOne: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProdutosService,
        ProdutosConverter,
        { provide: ProdutosRepository, useValue: repositoryMock },
      ],
    }).compile();

    service = moduleRef.get(ProdutosService);
  });

  afterEach(() => {
    repositoryMock.findOne.mockClear();
  });

  it('Service está definido', () => {
    expect(service).toBeDefined();
  });

  it('findOneByID() - deveria Buscar um registro pelo id', async () => {
    repositoryMock.findOne.mockReturnValueOnce(produtosMock);

    const resp = await service.findOneByID(1);

    expect(resp.id).toBe(1);
    expect(resp.nome).toEqual('Refrigerante');
    expect(resp.valor).toEqual(500);
    expect(resp.dataCriacao).toEqual(new Date('2022-05-01:00:00-03:00'));
    expect(resp.dataAtualizacao).toEqual(new Date('2022-05-01:00:00-03:00'));
  });

  it('findOneByID() - deveria retornar uma exceção de Produto não Encontrado', async () => {
    expect(service.findOneByID(999)).rejects.toThrow(
      new BadRequestException('Produto não Encontrado!'),
    );
  });
});

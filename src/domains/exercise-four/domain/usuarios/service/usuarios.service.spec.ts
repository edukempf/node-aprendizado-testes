import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { UsuariosConverter } from '../converter/usuarios.converter';
import { Usuarios } from '../entity/usuarios.entity';
import { UsuariosRepository } from '../repository/usuarios.repository';
import { UsuariosService } from './usuarios.service';

describe('Testando os metodos da UsuariosService', () => {
  let service: UsuariosService;

  const usuariosMock: Usuarios = {
    id: 1,
    nome: 'Kempf',
    cep: '8734000',
    createdDate: new Date('2022-05-01:00:00-03:00'),
    updateDate: new Date('2022-05-01:00:00-03:00'),
  };

  const repositoryMock = {
    findOne: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsuariosService,
        UsuariosConverter,
        { provide: UsuariosRepository, useValue: repositoryMock },
      ],
    }).compile();

    service = moduleRef.get(UsuariosService);
  });

  afterEach(() => {
    repositoryMock.findOne.mockClear();
  });

  it('Service está definido', () => {
    expect(service).toBeDefined();
  });

  it('findOneByID() - deveria Buscar um registro pelo id', async () => {
    repositoryMock.findOne.mockReturnValueOnce(usuariosMock);

    const resp = await service.findOneByID(1);

    expect(resp.id).toBe(1);
    expect(resp.nome).toEqual('Kempf');
    expect(resp.cep).toEqual('8734000');
    expect(resp.dataCriacao).toEqual(new Date('2022-05-01:00:00-03:00'));
    expect(resp.dataAtualizacao).toEqual(new Date('2022-05-01:00:00-03:00'));
  });

  it('findOneByID() - deveria retornar uma exceção de Usuario não Encontrado', async () => {
    expect(service.findOneByID(999)).rejects.toThrow(
      new BadRequestException('Usuario não Encontrado!'),
    );
  });
});

import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { CorreiosService } from './correios.service';

describe('Testando os metodos da CorreiosService', () => {
  let service: CorreiosService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CorreiosService],
    }).compile();

    service = moduleRef.get(CorreiosService);
  });
  it('Service está definido', () => {
    expect(service).toBeDefined();
  });

  it('recuperaValorPorCep() - deveria retornar um valor válido', async () => {
    const resp = await service.recuperaValorPorCep('87340000');

    expect(resp).toBe(100);
  });

  it('recuperaValorPorCep() - deveria retornar uma exceção de CEP não encontrado', async () => {
    expect(service.recuperaValorPorCep('999')).rejects.toThrow(
      new BadRequestException('CEP não Encontrado!'),
    );
  });
});

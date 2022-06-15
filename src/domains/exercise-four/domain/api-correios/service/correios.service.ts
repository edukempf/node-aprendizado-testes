import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CorreiosService {
  private valoresPorCep = {
    87340000: 100,
    87301190: 50,
    87301200: 25,
  };

  findValuePerCEP(cep: string): number {
    return this.valoresPorCep[cep];
  }

  async recuperaValorPorCep(cep: string): Promise<number> {
    const valor = await this.findValuePerCEP(cep);

    if (!valor) {
      throw new NotFoundException('CEP não Encontrado!');
    }

    return valor;
  }
}

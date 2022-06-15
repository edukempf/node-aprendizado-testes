import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CarrinhosDTO } from '../domain/carrinhos/dto/carrinhosDTO.dto';
import { CarrinhosService } from '../domain/carrinhos/service/carrinhos.service';

@Controller('/carrinhos')
export class CarrinhoController {
  constructor(readonly service: CarrinhosService) {}

  @Post()
  async manage(@Body() carrinho: CarrinhosDTO): Promise<any> {
    return this.service.manage(carrinho);
  }

  @Get('/:idCarrinho/valores')
  async recoveryValues(@Param('idCarrinho') idCarrinho: number) {
    return this.service.calcularValoresCarrinho(idCarrinho);
  }
}

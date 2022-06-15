import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '../../app/database/typeorm-ex.module';
import { ProdutosModule } from '../produtos/produtos.module';
import { CarrinhosProdutosConverter } from './converter/carrinhosprodutos.converter';
import { CarrinhosProdutosRepository } from './repository/carrinhosprodutos.repository';
import { CarrinhosProdutosService } from './service/carrinhosprodutos.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CarrinhosProdutosRepository]),
    ProdutosModule,
  ],
  providers: [CarrinhosProdutosService, CarrinhosProdutosConverter],
  exports: [CarrinhosProdutosService, CarrinhosProdutosConverter],
})
export class CarrinhosProdutosModule {}

import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '../../app/database/typeorm-ex.module';
import { CorreiosModule } from '../api-correios/correios.module';
import { CarrinhosProdutosModule } from '../carrinhosprodutos/carrinhosprodutos.module';
import { ProdutosModule } from '../produtos/produtos.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { CarrinhosConverter } from './converter/carrinhos.converter';
import { CarrinhosRepository } from './repository/carrinhos.repository';
import { CarrinhosService } from './service/carrinhos.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CarrinhosRepository]),
    ProdutosModule,
    UsuariosModule,
    CarrinhosProdutosModule,
    CorreiosModule,
  ],
  providers: [CarrinhosService, CarrinhosConverter],
  exports: [CarrinhosService],
})
export class CarrinhosModule {}

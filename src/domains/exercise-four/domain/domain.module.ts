import { Module } from '@nestjs/common';
import { CorreiosModule } from './api-correios/correios.module';

import { CarrinhosModule } from './carrinhos/carrinhos.module';
import { CarrinhosProdutosModule } from './carrinhosprodutos/carrinhosprodutos.module';
import { ProdutosModule } from './produtos/produtos.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    CarrinhosModule,
    CarrinhosProdutosModule,
    ProdutosModule,
    UsuariosModule,
    CorreiosModule,
  ],
  exports: [
    CarrinhosModule,
    CarrinhosProdutosModule,
    ProdutosModule,
    UsuariosModule,
    CorreiosModule,
  ],
})
export class DomainModule {}

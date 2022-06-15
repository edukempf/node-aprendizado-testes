import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarrinhoController } from '../controllers/carrinho.controller';
import { Carrinhos } from '../domain/carrinhos/entity/carrinhos.entity';
import { CarrinhosProdutos } from '../domain/carrinhosprodutos/entity/carrinhosprodutos.entity';
import { DomainModule } from '../domain/domain.module';
import { Produtos } from '../domain/produtos/entity/produtos.entity';
import { Usuarios } from '../domain/usuarios/entity/usuarios.entity';
import configuration from './configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configuration.database,
      entities: [Usuarios, Produtos, Carrinhos, CarrinhosProdutos],
      logging: true,
      synchronize: true,
    }),
    DomainModule,
  ],
  controllers: [CarrinhoController],
  providers: [],
})
export class AppModule {}

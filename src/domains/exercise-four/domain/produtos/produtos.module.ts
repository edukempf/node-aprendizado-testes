import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '../../app/database/typeorm-ex.module';
import { ProdutosConverter } from './converter/produtos.converter';
import { ProdutosRepository } from './repository/produtos.repository';
import { ProdutosService } from './service/produtos.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ProdutosRepository])],
  providers: [ProdutosService, ProdutosConverter],
  exports: [ProdutosService],
})
export class ProdutosModule {}

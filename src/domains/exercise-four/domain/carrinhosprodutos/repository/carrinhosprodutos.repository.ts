import { Repository } from 'typeorm';

import { CustomRepository } from '../../../app/database/typeorm-ex.decorator';
import { CarrinhosProdutos } from '../entity/carrinhosprodutos.entity';

@CustomRepository(CarrinhosProdutos)
export class CarrinhosProdutosRepository extends Repository<CarrinhosProdutos> {}

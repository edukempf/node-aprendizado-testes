import { Repository } from 'typeorm';

import { CustomRepository } from '../../../app/database/typeorm-ex.decorator';
import { Produtos } from '../entity/produtos.entity';

@CustomRepository(Produtos)
export class ProdutosRepository extends Repository<Produtos> {}

import { Repository } from 'typeorm';

import { CustomRepository } from '../../../app/database/typeorm-ex.decorator';
import { Carrinhos } from '../entity/carrinhos.entity';

@CustomRepository(Carrinhos)
export class CarrinhosRepository extends Repository<Carrinhos> {}

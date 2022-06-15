import { Repository } from 'typeorm';

import { CustomRepository } from '../../../app/database/typeorm-ex.decorator';
import { Usuarios } from '../entity/usuarios.entity';

@CustomRepository(Usuarios)
export class UsuariosRepository extends Repository<Usuarios> {}

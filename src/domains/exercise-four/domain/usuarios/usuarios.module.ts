import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '../../app/database/typeorm-ex.module';
import { UsuariosConverter } from './converter/usuarios.converter';
import { UsuariosRepository } from './repository/usuarios.repository';
import { UsuariosService } from './service/usuarios.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UsuariosRepository])],
  providers: [UsuariosService, UsuariosConverter],
  exports: [UsuariosService, UsuariosConverter],
})
export class UsuariosModule {}

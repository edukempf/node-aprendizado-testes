import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CarrinhosProdutos } from '../../carrinhosprodutos/entity/carrinhosprodutos.entity';
import { Usuarios } from '../../usuarios/entity/usuarios.entity';

@Entity({ name: 'carrinhos' })
export class Carrinhos {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Usuarios)
  @JoinColumn()
  usuario: Usuarios;

  @OneToMany(
    () => CarrinhosProdutos,
    (carrinhoProduto) => carrinhoProduto.carrinho,
    {
      cascade: true,
    },
  )
  carrinhosProdutos?: CarrinhosProdutos[];

  @Column({ name: 'created_at' })
  @CreateDateColumn()
  createdDate: Date;

  @Column({ name: 'update_at' })
  @UpdateDateColumn()
  updateDate: Date;
}

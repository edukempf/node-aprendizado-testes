import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Carrinhos } from '../../carrinhos/entity/carrinhos.entity';
import { Produtos } from '../../produtos/entity/produtos.entity';

@Entity({ name: 'carrinhos_produtos' })
export class CarrinhosProdutos {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Produtos, (produto) => produto.id, {
    nullable: false,
    eager: true,
  })
  @JoinTable()
  produto: Produtos;

  @ManyToOne(() => Carrinhos, (carrinhos) => carrinhos.carrinhosProdutos, {
    nullable: false,
    eager: true,
  })
  @JoinTable()
  carrinho: Carrinhos;

  @Column({ name: 'quantidade' })
  quantidade: number;

  @Column({ name: 'created_at' })
  @CreateDateColumn()
  createdDate: Date;

  @Column({ name: 'update_at' })
  @UpdateDateColumn()
  updateDate: Date;
}

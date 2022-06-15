import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'produtos' })
export class Produtos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'valor' })
  valor: number;

  @Column({ name: 'created_at' })
  @CreateDateColumn()
  createdDate: Date;

  @Column({ name: 'update_at' })
  @UpdateDateColumn()
  updateDate: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'created_at' })
  @CreateDateColumn()
  createdDate: Date;

  @Column({ name: 'update_at' })
  @UpdateDateColumn()
  updateDate: Date;
}

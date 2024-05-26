import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  preco: number;

  @Column()
  descricao: string;
}

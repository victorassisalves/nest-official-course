import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('coffee')
export class CoffeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavors: string[];
}
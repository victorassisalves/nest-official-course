import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { FlavorEntity } from "./flavor.entity";

@Entity('coffee')
export class CoffeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // name: string; // Renamed to title to test migration.

  @Column()
  title: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany((type) => FlavorEntity, (flavor) => flavor.coffees, {
    cascade: true, // ['insert']
  })
  flavors: FlavorEntity[];
}
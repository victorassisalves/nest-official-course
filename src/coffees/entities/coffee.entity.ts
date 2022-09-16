import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlavorEntity } from './flavor.entity';

@Entity('coffee')
export class CoffeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  title: string; // Renamed to test migration.

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

import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(['name', 'type']) // Add this colums to index for database search. This speeds up search for the wanted value
@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}

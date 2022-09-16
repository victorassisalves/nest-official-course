import { CoffeeEntity } from "src/coffees/entities/coffee.entity";
import { FlavorEntity } from "src/coffees/entities/flavor.entity";
import { CoffeeRefactor1663350137383 } from "src/migrations/1663350137383-CoffeeRefactor";
import { SchemaSync1663350959582 } from "src/migrations/1663350959582-SchemaSync";
import { DataSource } from "typeorm";

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [CoffeeEntity, FlavorEntity],
  migrations: [CoffeeRefactor1663350137383, SchemaSync1663350959582],
});

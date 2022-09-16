import { CoffeeRefactor1663350137383 } from "src/migrations/1663350137383-CoffeeRefactor";
import { DataSource } from "typeorm";

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [],
  migrations: [CoffeeRefactor1663350137383],
})
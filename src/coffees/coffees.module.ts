import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { CoffeeEntity } from './entities/coffee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeEntity])], // forFeature() to register entities
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule { }

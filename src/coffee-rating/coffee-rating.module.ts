import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeeRatingController } from './coffee-rating.controller';
import { CoffeesService } from 'src/coffees/coffees.service';
import { CoffeesModule } from 'src/coffees/coffees.module';

@Module({
  controllers: [CoffeeRatingController],
  providers: [CoffeeRatingService],
  imports: [CoffeesModule],
})
export class CoffeeRatingModule { }

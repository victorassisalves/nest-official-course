import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CreateCoffeeRatingDto } from './dto/create-coffee-rating.dto';
import { UpdateCoffeeRatingDto } from './dto/update-coffee-rating.dto';

@Controller('coffee-rating')
export class CoffeeRatingController {
  constructor(private readonly coffeeRatingService: CoffeeRatingService) {}

  @Post()
  create(@Body() createCoffeeRatingDto: CreateCoffeeRatingDto) {
    return this.coffeeRatingService.create(createCoffeeRatingDto);
  }

  @Get()
  findAll() {
    return this.coffeeRatingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeRatingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeRatingDto: UpdateCoffeeRatingDto) {
    return this.coffeeRatingService.update(+id, updateCoffeeRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeRatingService.remove(+id);
  }
}

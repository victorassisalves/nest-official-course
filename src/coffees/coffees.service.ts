import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeeEntity } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: CoffeeEntity[] = [
    {
      id: 1,
      name: 'Shipwrek Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla', 'caramelo']
    }
  ];
  findAll() {
    // const { limit, offset } = pagQuery;
    return this.coffees;
  }

  findOne(id: string) {
    // findOne(@Param() param) -> param.id
    return this.coffees.find(coffee => coffee.id == +id);
  }

  create(createCoffeeDto) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: string, updateCoffeeDto) {
    const coffee = this.findOne(id);
    if (coffee) {
      coffee.name = updateCoffeeDto.name;
      coffee.brand = updateCoffeeDto.brand;
      coffee.flavors = updateCoffeeDto.flavors;
      return coffee;
    } else {
      throw new HttpException(`Coffee #${id}`, HttpStatus.NOT_FOUND);
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(coffee => coffee.id == +id);
    if (coffeeIndex >= 0) {
      const removedCoffee = this.coffees[coffeeIndex];
      this.coffees.splice(coffeeIndex, 1);
      return `Coffee #${removedCoffee.id} ${removedCoffee.name} was removed from list!`
    }
    throw new HttpException(`Coffee #${id}`, HttpStatus.NOT_FOUND);
  }
}

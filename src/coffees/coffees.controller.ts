import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly cofeeServices: CoffeesService) { }
  @Get()
  finAll(@Query() pagQuery: PaginationQueryDto) {
    return this.cofeeServices.findAll(pagQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // findOne(@Param() param) -> param.id
    const coffee = this.cofeeServices.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found!`);
    }
    return coffee;
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.cofeeServices.create(createCoffeeDto);
  }

  // @Put need the whole body object
  // @Patch can have just the needed property
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.cofeeServices.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cofeeServices.remove(id);
  }
}

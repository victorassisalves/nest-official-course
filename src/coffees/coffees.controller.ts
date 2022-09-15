import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  finAll() {
    return 'Your coffe is here!';
  }
}

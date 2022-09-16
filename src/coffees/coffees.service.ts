import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CoffeeEntity } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(CoffeeEntity)
    private readonly coffeeRepository: Repository<CoffeeEntity>,

    @InjectRepository(FlavorEntity)
    private readonly flavorRepository: Repository<FlavorEntity>,

    private readonly dataSource: DataSource,
  ) { }

  findAll(pagQuery: PaginationQueryDto) {
    const { limit, offset } = pagQuery;
    return this.coffeeRepository.find({
      relations: {
        flavors: true
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    // findOne(@Param() param) -> param.id
    const coffee = await this.coffeeRepository.findOne({
      where: {
        id: +id
      },
      relations: {
        flavors: true
      }
    });
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found.`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors && // Since flavors is optional here, we need to check before the preload.
      (await Promise.all(
        updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
      ));
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors
    });
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found.`, HttpStatus.NOT_FOUND);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: CoffeeEntity) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;
      // const recommendEvent = new Event();
      // recommendEvent.name = 'recommend_coffee';
      // recommendEvent.type = 'coffee';
      // recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      // await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      throw new InternalServerErrorException(
        'Not Able to run query runner for recommendations',
      );
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<FlavorEntity> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}

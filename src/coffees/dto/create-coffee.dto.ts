import { IsString } from "class-validator";

export class CreateCoffeeDto {
  // id: number;
  @IsString()
  readonly title?: string;
  @IsString()
  readonly brand?: string;
  @IsString({ each: true })
  readonly flavors?: string[];
  @IsString()
  readonly description: string;
}

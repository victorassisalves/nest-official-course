import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number) // Convert param string to number
  limit: number;


  @IsOptional()
  @IsPositive()
  offset: number;


}

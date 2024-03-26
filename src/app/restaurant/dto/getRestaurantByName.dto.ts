import { ApiProperty } from "@nestjs/swagger";

export default class GetRestaurantByNameDto {
  @ApiProperty({ example: "name" })
  readonly name: string;
  @ApiProperty({ example: "address" })
  readonly address: string;
}

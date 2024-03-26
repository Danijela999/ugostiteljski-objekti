import { ApiProperty } from "@nestjs/swagger";

export default class AddRestaurantDto {
  @ApiProperty({ example: "name" })
  readonly name: string;
  @ApiProperty({ example: "address" })
  readonly address: string;
}

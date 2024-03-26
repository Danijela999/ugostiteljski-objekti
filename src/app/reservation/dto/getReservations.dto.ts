import { ApiProperty } from "@nestjs/swagger";

export default class GetReservationsDto {
  @ApiProperty({ example: 1 })
  readonly userId: number;
}

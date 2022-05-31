import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ example: 1, description: 'user id' })
  readonly userId: number;

  @ApiProperty({ example: 'ban reason text', description: 'ban reason' })
  readonly banReason: string;
}

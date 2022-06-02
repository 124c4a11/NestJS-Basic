import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'post title', description: 'post title' })
  readonly title: string;

  @ApiProperty({ example: 'post content text', description: 'post content' })
  readonly content: string;

  @ApiProperty({ example: 1, description: 'user Id' })
  readonly userId: number;
}

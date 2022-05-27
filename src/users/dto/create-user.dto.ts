import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'user name' })
  readonly name: string;

  @ApiProperty({ example: 'john@email.com', description: 'user email' })
  readonly email: string;

  @ApiProperty({ example: 'userpassword1234', description: 'user password' })
  readonly password: string;
}

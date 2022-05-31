import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'user name' })
  @IsString({ message: 'must be a string' })
  readonly name: string;

  @ApiProperty({ example: 'john@email.com', description: 'user email' })
  @IsEmail({ message: 'must match an email format' })
  readonly email: string;

  @ApiProperty({ example: 'userpassword1234', description: 'user password' })
  @IsString({ message: 'must be a string' })
  @Length(4, 16, {
    message: 'must be not less than 4, not mutch than 16 characters',
  })
  readonly password: string;
}

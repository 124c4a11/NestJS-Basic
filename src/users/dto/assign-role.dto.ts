import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { UserRoles } from 'src/types/user-roles';

export class AssignRoleDto {
  @ApiProperty({ example: 1, description: 'user id' })
  @IsNumber({}, { message: 'must be a number' })
  readonly userId: number;

  @ApiProperty({ example: 'ADMIN', description: 'user role' })
  @IsEnum(UserRoles, {
    message: "must be a valid enum value: 'ADMIN' or 'USER'",
  })
  readonly value: UserRoles;
}

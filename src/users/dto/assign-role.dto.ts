import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/types/user-roles';

export class AssignRoleDto {
  @ApiProperty({ example: 1, description: 'user id' })
  readonly userId: number;

  @ApiProperty({ example: 'ADMIN', description: 'user role' })
  readonly value: UserRoles;
}

import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/types/user-roles';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'unique value' })
  readonly value: UserRoles;

  @ApiProperty({ example: 'Administrator', description: 'role description' })
  readonly description: string;
}

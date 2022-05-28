import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRoles } from 'src/types/user-roles';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entity/role.entity';
import { RolesService } from './roles.service';

@ApiTags('ROLES')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'create role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }

  @ApiOperation({ summary: 'get role by value' })
  @ApiResponse({ status: 200, type: Role })
  @Get(':value')
  getByValue(@Param('value') value: UserRoles) {
    return this.rolesService.getByValue(value);
  }
}

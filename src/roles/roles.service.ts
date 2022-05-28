import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoles } from 'src/types/user-roles';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entity/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async create(dto: CreateRoleDto) {
    return await this.roleRepo.insert(dto);
  }

  async getByValue(value: UserRoles) {
    return await this.roleRepo.findOne({ value });
  }
}

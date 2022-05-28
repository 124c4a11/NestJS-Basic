import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { UserRoles } from 'src/types/user-roles';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepo.create(dto);
    const role = await this.rolesService.getByValue(UserRoles.USER);

    user.roles = [role];
    await this.userRepo.save(user);

    return user;
  }

  async getAll() {
    return await this.userRepo.find();
  }

  async getByEmail(email: string) {
    return await this.userRepo.findOne({ email });
  }
}

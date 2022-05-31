import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { UserRoles } from 'src/types/user-roles';
import { Repository } from 'typeorm';
import { AssignRoleDto } from './dto/assign-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
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
    return await this.userRepo.findOne({ email }, { relations: ['roles'] });
  }

  async assignRole(dto: AssignRoleDto) {
    try {
      const user = await this.userRepo.findOne({
        where: { id: dto.userId },
        relations: ['roles'],
      });

      const role = await this.rolesService.getByValue(dto.value);

      const isUserContainsRole = user.roles.some(
        ({ value }) => value === dto.value,
      );

      if (!isUserContainsRole) {
        user.roles.push(role);

        await this.userRepo.save(user);
      }

      return user;
    } catch (err) {
      throw new HttpException(
        'The role or the user is not found!',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });

    if (!user) {
      throw new HttpException('The user is not found!', HttpStatus.NOT_FOUND);
    }

    user.banned = true;
    user.banReason = dto.banReason;

    await this.userRepo.save(user);

    return user;
  }
}

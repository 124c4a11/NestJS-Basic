import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getByEmail(dto.email);

    if (candidate) {
      throw new HttpException(
        'The user with specified email already exist!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordHash = await bcrypt.hash(
      dto.password,
      Number(process.env.SALT),
    );

    const user = await this.usersService.create({
      ...dto,
      password: passwordHash,
    });

    return this.generateToken(user);
  }

  async login(dto: CreateUserDto) {
    const user = await this.getValidUser(dto);

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const { id, email, roles } = user;

    return { token: this.jwtService.sign({ id, email, roles }) };
  }

  private async getValidUser(dto: CreateUserDto) {
    const user = await this.usersService.getByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'The user with specified email is unexist!',
      });
    }

    const validPassword = await bcrypt.compare(dto.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException({
        message: 'The pasword is wrong!',
      });
    }

    return user;
  }
}

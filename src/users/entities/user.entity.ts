import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/entity/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'unique key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Joh Doe', description: 'user name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'user@email.com', description: 'user email' })
  @Column()
  email: string;

  @ApiProperty({ example: 'userpassword1234', description: 'user password' })
  @Column()
  password: string;

  @ApiProperty({
    example: false,
    description: 'banned or not',
    default: false,
    required: false,
  })
  @Column({ default: false })
  banned: boolean;

  @ApiProperty({
    example: 'ban reason text',
    description: 'ban reason',
    required: false,
    nullable: true,
  })
  @Column({ nullable: true })
  banReason: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}

import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/types/user-roles';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @ApiProperty({ example: 1, description: 'unique value' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'unique value' })
  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.USER,
    unique: true,
  })
  value: UserRoles;

  @ApiProperty({ example: 'Administrator', description: 'role description' })
  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User;
}

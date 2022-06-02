import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @ApiProperty({ example: 1, description: 'unique key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'post title', description: 'post title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'post content text', description: 'post content' })
  @Column()
  content: string;

  @ApiProperty({ example: 'imagename.jpg', description: 'image name' })
  @Column({ nullable: true })
  image: string;

  @ApiProperty({ example: 1, description: 'user Id' })
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;
}

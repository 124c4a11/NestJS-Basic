import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private readonly filesSevice: FilesService,
  ) {}

  async create(dto: CreatePostDto, image: Express.Multer.File) {
    const fileName = await this.filesSevice.create(image);

    return await this.postRepo.insert({ ...dto, image: fileName });
  }
}

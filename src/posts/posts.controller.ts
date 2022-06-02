import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as Article } from './entities/post.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('POST')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'create post' })
  @ApiResponse({ status: 200, type: Article })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log('=========', image);
    return this.postsService.create(dto, image);
  }
}

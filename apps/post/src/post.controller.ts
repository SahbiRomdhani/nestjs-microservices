import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { createPostDto } from './dto/create-post.request';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts() {
    return await this.postService.allPosts();
  }

  @Post()
  async createPost(@Body() post: createPostDto) {
    const newPost = await this.postService.createPost(post);
    return newPost;
  }
}

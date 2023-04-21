import { Inject, Injectable } from '@nestjs/common';
import { PostEntity } from './entity/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPostDto } from './dto/create-post.request';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from './constants/services';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repository: Repository<PostEntity>,
    @Inject(NOTIFICATION_SERVICE) private notificationClient: ClientProxy,
  ) {}
  async allPosts(): Promise<PostEntity[]> {
    return await this.repository.find();
  }

  async createPost(body: createPostDto): Promise<PostEntity> {
    const newPost = await this.repository.save(body);
    const notif = { title: 'create post', post: newPost.id };
    await lastValueFrom(this.notificationClient.emit('post_created', notif));
    return newPost;
  }
}

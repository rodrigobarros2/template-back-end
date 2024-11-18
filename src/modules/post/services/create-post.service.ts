import { Post } from '@prisma/client';
import { PostProps, PostsRepository } from '../models/post.model';

export class CreatePostService {
  constructor(private readonly postRepository: PostsRepository) {}

  public async perform(post: PostProps): Promise<Post> {
    return this.postRepository.create(post);
  }
}

import { Post } from '@prisma/client';
import { PostProps, PostsRepository } from '../models/post.model';

export class UpdatePostService {
  constructor(private readonly postRepository: PostsRepository) {}

  public async perform(id: string, post: Partial<PostProps>): Promise<Post> {
    return this.postRepository.update(id, post);
  }
}

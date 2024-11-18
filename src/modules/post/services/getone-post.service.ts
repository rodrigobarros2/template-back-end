import { Post } from '@prisma/client';
import { PostsRepository } from '../models/post.model';

export class GetOnePostService {
  constructor(private readonly postRepository: PostsRepository) {}

  public async perform(id: string): Promise<Post | null> {
    return this.postRepository.getById(id);
  }
}

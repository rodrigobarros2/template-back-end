import { Post } from '@prisma/client';
import { PostsRepository } from '../models/post.model';

export class GetAllPostService {
  constructor(private readonly postRepository: PostsRepository) {}

  public async perform(): Promise<Post[]> {
    return this.postRepository.getAll();
  }
}

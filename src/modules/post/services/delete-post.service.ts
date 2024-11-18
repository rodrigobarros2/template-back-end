import { PostsRepository } from '../models/post.model';

export class DeletePostService {
  constructor(private readonly postRepository: PostsRepository) {}

  public async perform(id: string): Promise<boolean> {
    return this.postRepository.delete(id);
  }
}

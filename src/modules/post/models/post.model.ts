import { Post } from '@prisma/client';

export interface PostsRepository {
  create(post: PostProps): Promise<Post>;
  update(id: string, post: Partial<PostProps>): Promise<Post>;
  getById(id: string): Promise<Post | null>;
  getAll(): Promise<Post[]>;
  delete(id: string): Promise<boolean>;
}

export interface PostProps {
  id?: string;
  title: string;
  content: string;
  published?: boolean;
  authorId: string;
}

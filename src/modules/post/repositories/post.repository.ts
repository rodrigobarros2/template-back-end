import { Post } from '@prisma/client';
import prisma from '../../../database/prismaClient';
import { PostProps, PostsRepository } from '../models/post.model';

export class PostsDBRepository implements PostsRepository {
  private prisma = prisma;

  async create(post: PostProps): Promise<Post> {
    return this.prisma.post.create({
      data: post,
    });
  }

  async update(id: string, post: Partial<PostProps>): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: post,
    });
  }

  async getById(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  async getAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.post.delete({
      where: { id },
    });
    return true;
  }
}

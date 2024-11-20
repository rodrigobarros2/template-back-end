import { PostsDBRepository } from '../repositories/post.repository';
import { CreatePostService } from './create-post.service';
import { DeletePostService } from './delete-post.service';
import { GetAllPostService } from './getall-post.service';
import { GetOnePostService } from './getone-post.service';
import { UpdatePostService } from './update-post.service';

const postRepository = new PostsDBRepository();

export const createPostService = new CreatePostService(postRepository);
export const deletePostService = new DeletePostService(postRepository);
export const getAllPostsService = new GetAllPostService(postRepository);
export const getOnePostService = new GetOnePostService(postRepository);
export const updatePostService = new UpdatePostService(postRepository);

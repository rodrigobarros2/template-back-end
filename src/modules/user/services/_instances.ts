import { UsersDBRepository } from '../repositories/user.repository';
import { GetAllUsersService } from './getall-users.service';
import { DeleteUserService } from './delete-users.service';
import { GetOneUserService } from './getone-users.service';
import { CreateUserService } from './create-users.service';
import { UpdateUserService } from './update-users.service';

const userRepository = new UsersDBRepository();

export const getAllUsersService = new GetAllUsersService(userRepository);
export const deleteUserService = new DeleteUserService(userRepository);
export const getOneUserService = new GetOneUserService(userRepository);
export const createUserService = new CreateUserService(userRepository);
export const updateUserService = new UpdateUserService(userRepository);

import bcrypt from 'bcrypt';
import redisClient from '../../../main/config/redis';
import { logger } from '../../../shared/utils/logger';
import { generateToken } from '../../../shared/utils/jwt';
import { HttpCode } from '../../../constants/httpCode.enum';
import { RegisterResponse, UserProps, UsersRepository } from '../models/user.model';
import { UserRole } from '../../../constants/roles.enum';

const CACHE_TTL_IN_SECONDS = 3600;

export class CreateUserService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async perform(user: UserProps): Promise<RegisterResponse> {
    if (!user.password) {
      throw {
        status: HttpCode.BAD_REQUEST,
        message: 'Password is required',
      };
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await this.userRepository.create({
      ...user,
      password: hashedPassword,
      role: UserRole.USER,
    });

    if (!createdUser) {
      throw {
        status: HttpCode.NOT_FOUND,
        message: 'A criação do usuário falhou',
      };
    }

    const userFromDb = await this.userRepository.getById(createdUser.id);

    if (!userFromDb) {
      throw {
        status: HttpCode.NOT_FOUND,
        message: 'Usuário não encontrado no banco de dados',
      };
    }

    await redisClient.set(`user:${userFromDb.id}`, JSON.stringify(userFromDb), {
      EX: CACHE_TTL_IN_SECONDS,
    });

    const token = generateToken({
      id: userFromDb.id,
      email: userFromDb.email,
      name: userFromDb.name,
      role: userFromDb.role as string,
    });

    logger.info('Usuário registrado e armazenado no cache:', userFromDb);

    return {
      user: {
        name: userFromDb.name,
        email: userFromDb.email,
        role: userFromDb.role as string,
      },
      token,
    };
  }
}

import { LoginService } from './login.service';
import { UsersDBRepository } from '../../user/repositories/user.repository';
import { RefreshTokenService } from './refreshToken.service';

const userRepository = new UsersDBRepository();

export const loginService = new LoginService(userRepository);
export const refreshTokenService = new RefreshTokenService(userRepository);

import jwt from 'jsonwebtoken';
import env from '../../main/config/env';
import { HttpCode } from '../../constants/httpCode.enum';

if (!env.jwtSecret || !env.jwtRefreshSecret) {
  throw {
    status: HttpCode.UNAUTHORIZED,
    message: 'JWT_SECRET or JWT_REFRESH_SECRET is not defined',
  };
}

export const generateToken = (payload: object, expiresIn: string | number = '1h'): string => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn });
};

export const generateRefreshToken = (payload: object, expiresIn: string | number = '7d'): string => {
  return jwt.sign(payload, env.jwtRefreshSecret, { expiresIn });
};

export const verifyToken = (token: string): string | object => {
  return jwt.verify(token, env.jwtSecret);
};

export const verifyRefreshToken = (refreshToken: string): string | object => {
  return jwt.verify(refreshToken, env.jwtRefreshSecret);
};

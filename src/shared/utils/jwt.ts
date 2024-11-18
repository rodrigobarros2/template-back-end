import jwt from 'jsonwebtoken';
import env from '../../main/config/env';
import { HttpCode } from '../enum/httpCode.enum';

if (!env.jwtSecret || !env.jwtRefreshSecret) {
  throw {
    status: HttpCode.UNAUTHORIZED,
    message: 'JWT_SECRET or JWT_REFRESH_SECRET is not defined',
  };
}

export const generateToken = (payload: object, expiresIn: string | number = '1h'): string => {
  if (!env.jwtSecret) {
    throw {
      status: HttpCode.UNAUTHORIZED,
      message: 'JWT_SECRET is not defined',
    };
  }

  return jwt.sign(payload, env.jwtSecret, { expiresIn });
};

export const generateRefreshToken = (payload: object, expiresIn: string | number = '7d'): string => {
  if (!env.jwtRefreshSecret) {
    throw {
      status: HttpCode.UNAUTHORIZED,
      message: 'JWT_REFRESH_SECRET is not defined',
    };
  }

  return jwt.sign(payload, env.jwtRefreshSecret, { expiresIn });
};

export const verifyToken = (token: string): string | object => {
  if (!env.jwtSecret) {
    throw {
      status: HttpCode.UNAUTHORIZED,
      message: 'JWT_REFRESH_SECRET is not defined',
    };
  }

  return jwt.verify(token, env.jwtSecret);
};

export const verifyRefreshToken = (refreshToken: string): string | object => {
  if (!env.jwtRefreshSecret) {
    throw {
      status: HttpCode.UNAUTHORIZED,
      message: 'JWT_REFRESH_SECRET is not defined',
    };
  }

  return jwt.verify(refreshToken, env.jwtRefreshSecret);
};

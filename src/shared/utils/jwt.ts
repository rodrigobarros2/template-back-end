import jwt from 'jsonwebtoken';
import env from '../../main/config/env';

if (!env.jwtSecret || !env.jwtRefreshSecret) {
  throw new Error('JWT_SECRET or JWT_REFRESH_SECRET is not defined');
}

export const generateToken = (payload: object, expiresIn: string | number = '1h'): string => {
  if (!env.jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign(payload, env.jwtSecret, { expiresIn });
};

export const generateRefreshToken = (payload: object, expiresIn: string | number = '7d'): string => {
  if (!env.jwtRefreshSecret) {
    throw new Error('JWT_REFRESH_SECRET is not defined');
  }

  return jwt.sign(payload, env.jwtRefreshSecret, { expiresIn });
};

export const verifyToken = (token: string): string | object => {
  try {
    if (!env.jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    return jwt.verify(token, env.jwtSecret);
  } catch {
    throw new Error('Invalid or expired token');
  }
};

export const verifyRefreshToken = (refreshToken: string): string | object => {
  try {
    if (!env.jwtRefreshSecret) {
      throw new Error('JWT_REFRESH_SECRET is not defined');
    }
    return jwt.verify(refreshToken, env.jwtRefreshSecret);
  } catch {
    throw new Error('Invalid or expired refresh token');
  }
};

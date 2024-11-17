import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET as string;

if (!SECRET_KEY || !REFRESH_SECRET_KEY) {
  throw new Error("JWT_SECRET or JWT_REFRESH_SECRET is not defined");
}

export const generateToken = (payload: object, expiresIn: string | number = "1h") => {
  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const generateRefreshToken = (payload: object, expiresIn: string | number = "7d") => {
  if (!REFRESH_SECRET_KEY) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }

  return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    return jwt.verify(refreshToken, REFRESH_SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};

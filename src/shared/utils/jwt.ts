import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

export const generateToken = (payload: object, expiresIn = "1h") => {
  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    throw new Error("Invalid or expired token");
  }
};

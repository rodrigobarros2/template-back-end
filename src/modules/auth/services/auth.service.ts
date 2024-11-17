import bcrypt from "bcrypt";
import prisma from "../../../database/prismaClient";
import { generateToken } from "../../../shared/utils/jwt";

export class AuthService {
  static async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return user;
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Credenciais inválidas");

    const token = generateToken({ id: user.id, email: user.email, name: user.name });
    return { token, user };
  }
}

import prisma from "../../../database/prismaClient";
import { UserProps, UsersRepository } from "../models/user.model";

export class UsersDBRepository implements UsersRepository {
  private prisma = prisma;

  async create(user: UserProps): Promise<{ id: string }> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    return { id: createdUser.id };
  }

  async getAll(): Promise<UserProps[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    }));
  }

  async update(id: string, user: Partial<UserProps>): Promise<{ id: string }> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: user,
    });
    return { id: updatedUser.id };
  }

  async getById(id: string): Promise<UserProps | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.user.delete({
      where: { id },
    });
    return true;
  }
}

import prisma from '../../../database/prismaClient';
import { UserRole } from '../../../constants/roles.enum';
import { UserProps, UsersRepository } from '../models/user.model';

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

  async getAll(page: number, limit: number): Promise<UserProps[]> {
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * limit, // Pula os registros das páginas anteriores
      take: limit, // Limita o número de registros retornados
    });
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role as UserRole,
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
      role: user.role as UserRole,
    };
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.user.delete({
      where: { id },
    });
    return true;
  }

  async getByEmail(email: string): Promise<UserProps | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role as UserRole,
    };
  }
}

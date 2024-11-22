/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UsersDBRepository } from './user.repository';
import { UserProps } from '../models/user.model';
import { UserRole } from '../../../constants/roles.enum';

vi.mock('@prisma/client', () => {
  const Decimal = vi.fn().mockImplementation((value) => ({
    toNumber: () => Number(value),
  }));

  return {
    PrismaClient: vi.fn().mockImplementation(() => ({
      user: {
        create: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
        delete: vi.fn(),
        update: vi.fn(),
      },
    })),
    Prisma: {
      Decimal,
    },
  };
});

describe('UsersDBRepository', () => {
  let repository: UsersDBRepository;
  let mockPrisma: any;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new UsersDBRepository();
    mockPrisma = (repository as any).prisma;
  });

  describe('create', () => {
    it('deve criar um novo usuário', async () => {
      const mockUser: UserProps = {
        id: '1',
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password123',
        role: 'ADMIN' as UserRole,
      };

      mockPrisma.user.create.mockResolvedValue({ id: '1' });

      const result = await repository.create(mockUser);

      expect(result).toEqual({ id: '1' });
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          name: mockUser.name,
          email: mockUser.email,
          password: mockUser.password,
        },
      });
    });
  });

  describe('getById', () => {
    it('deve retornar um usuário pelo ID', async () => {
      const mockUser: UserProps = {
        id: '1',
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password123',
        role: 'USER' as UserRole,
      };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await repository.getById('1');
      expect(result).toEqual(mockUser);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('deve retornar null se o usuário não for encontrado', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await repository.getById('1');

      expect(result).toBeNull();
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('getAll', () => {
    it('deve retornar todos os usuários', async () => {
      const mockUsers: UserProps[] = [
        {
          id: '1',
          name: 'User 1',
          email: 'user1@example.com',
          password: 'password123',
          role: 'USER' as UserRole,
        },
        {
          id: '2',
          name: 'User 2',
          email: 'user2@example.com',
          password: 'password456',
          role: 'USER' as UserRole,
        },
      ];
      mockPrisma.user.findMany.mockResolvedValue(mockUsers);

      const result = await repository.getAll(1, 10);

      expect(result).toEqual(mockUsers);
      expect(mockPrisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('deve excluir um usuário pelo ID', async () => {
      mockPrisma.user.delete.mockResolvedValue({ id: '1' });

      const result = await repository.delete('1');

      expect(result).toBe(true);
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('deve retornar false se o usuário não for encontrado para exclusão', async () => {
      mockPrisma.user.delete.mockRejectedValue(new Error('User not found'));

      const result = await repository.delete('1');

      expect(result).toBe(false);
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});

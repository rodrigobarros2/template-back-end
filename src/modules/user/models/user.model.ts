import { UserRole } from '../../../constants/roles.enum';

export interface UsersRepository {
  create(user: UserProps): Promise<{ id: string }>;
  update(id: string, user: UserProps): Promise<{ id: string }>;
  getById(id: string): Promise<UserProps | null>;
  getAll(page: number, limit: number): Promise<UserProps[]>;
  delete(id: string): Promise<boolean>;
  getByEmail(email: string): Promise<UserProps | null>;
}

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterResponse {
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

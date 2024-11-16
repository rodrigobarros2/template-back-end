export interface UsersRepository {
  create(user: UserProps): Promise<{ id: string }>;
  update(id: string, user: UserProps): Promise<{ id: string }>;
  getById(id: string): Promise<UserProps | null>;
  getAll(): Promise<UserProps[]>;
  delete(id: string): Promise<boolean>;
}

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}
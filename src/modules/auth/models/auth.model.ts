import { UserRole } from '../../../constants/roles.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

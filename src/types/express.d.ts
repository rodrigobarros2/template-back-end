import { UserRole } from '../../shared/enum/roles.enum';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: UserRole;
      };
    }
    interface Response {
      sendResponse?: (body: unknown) => Response;
    }
  }
}
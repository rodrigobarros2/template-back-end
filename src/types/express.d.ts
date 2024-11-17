import { User } from '../../path/to/user/model';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

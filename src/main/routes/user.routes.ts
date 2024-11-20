import validate from '../middlewares/validate.middleware';
import { Router } from 'express';
import { UserRole } from '../../constants/roles.enum';
import { authorize } from '../middlewares/authorize.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { CreateUserSchema } from '../middlewares/schema/user.schema';
import UserController from '../../modules/user/controllers/user.controller';

const router = Router();

router.get('/', authenticate, authorize([UserRole.ADMIN, UserRole.USER, UserRole.EMPLOYEE]), UserController.findAll);

router.post('/', validate(CreateUserSchema), UserController.create);

router.get('/:id', authenticate, authorize([UserRole.ADMIN, UserRole.USER, UserRole.EMPLOYEE]), UserController.findOne);

router.patch(
  '/:id',
  authenticate,
  authorize([UserRole.ADMIN, UserRole.USER, UserRole.EMPLOYEE]),
  UserController.update,
);

router.delete(
  '/:id',
  authenticate,
  authorize([UserRole.ADMIN, UserRole.USER, UserRole.EMPLOYEE]),
  UserController.remove,
);

export default router;

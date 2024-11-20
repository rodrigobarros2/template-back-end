import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/authorize.middleware';
import { UserRole } from '../../constants/roles.enum';
import { PostController } from '../../modules/post/controller/post.controller';
import { CreatePostSchema } from '../middlewares/schema/post.schema';
import validate from '../middlewares/validate.middleware';

const router = Router();

router.get('/', authenticate, authorize([UserRole.ADMIN, UserRole.USER, UserRole.EMPLOYEE]), PostController.findAll);

router.post(
  '/',
  authenticate,
  authorize([UserRole.ADMIN, UserRole.USER]),
  validate(CreatePostSchema),
  PostController.create,
);

router.get('/:id', authenticate, authorize([UserRole.ADMIN, UserRole.USER, UserRole.EMPLOYEE]), PostController.findOne);
router.patch('/:id', authenticate, authorize([UserRole.ADMIN, UserRole.USER]), PostController.update);
router.delete('/:id', authenticate, authorize([UserRole.ADMIN]), PostController.remove);

export default router;

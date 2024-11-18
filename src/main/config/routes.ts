import 'express-async-errors';
import { Router } from 'express';

import usersRoutes from '../routes/user.routes';
import authRoutes from '../routes/auth.routes';
import postRoutes from '../routes/post.routes';

const router = Router();

router.use('/user', usersRoutes);
router.use('/auth', authRoutes);
router.use('/posts', postRoutes);

export default router;

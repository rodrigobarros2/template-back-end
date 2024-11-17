import { Router } from 'express';
import { AuthController } from '../../modules/auth/controllers/auth.controller';
import { loginRateLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', loginRateLimiter, AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
export default router;

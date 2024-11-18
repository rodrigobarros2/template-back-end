import { Router } from 'express';
import { AuthController } from '../../modules/auth/controllers/auth.controller';
import { loginRateLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();

router.post('/login', loginRateLimiter, AuthController.login);
router.post('/refresh-token', loginRateLimiter, AuthController.refreshToken);
export default router;

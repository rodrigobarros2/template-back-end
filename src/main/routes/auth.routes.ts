import { Router } from "express";
import { AuthController } from "../../modules/auth/controllers/auth.controller";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
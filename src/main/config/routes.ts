import "express-async-errors";
import { Router } from "express";

import usersRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";

const router = Router();

router.use("/user", usersRoutes);
router.use("/auth", authRoutes);

export default router;

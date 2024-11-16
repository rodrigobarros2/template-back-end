import "express-async-errors";
import { Router } from "express";

import usersRoutes from "../routes/user.routes";

const router = Router();

router.use("/user", usersRoutes);

export default router;

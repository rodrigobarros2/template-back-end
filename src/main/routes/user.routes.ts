import UserController from "../../modules/user/controllers/user.controller.ts";
import validate from "../middlewares/validate.middleware";
import { Router } from "express";
import { UserRole } from "../../shared/enum/roles.enum";
import { authorize } from "../middlewares/authorize.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { CreateUserSchema } from "../middlewares/schema/user.schema";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize([UserRole.ADMIN, UserRole.USER, UserRole.EMPLOYEE]),
  UserController.findAll
);

router.post(
  "/",
  authenticate,
  authorize([UserRole.ADMIN, UserRole.USER, UserRole.EMPLOYEE]),
  validate(CreateUserSchema),
  UserController.create
);

router.get(
  "/:id",
  authenticate,
  authorize([UserRole.ADMIN, UserRole.USER, UserRole.EMPLOYEE]),
  UserController.findOne
);

router.patch(
  "/:id",
  authenticate,
  authorize([UserRole.ADMIN, UserRole.USER, UserRole.EMPLOYEE]),
  UserController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize([UserRole.ADMIN, UserRole.USER, UserRole.EMPLOYEE]),
  UserController.remove
);

export default router;

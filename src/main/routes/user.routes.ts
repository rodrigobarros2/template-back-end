import { Router } from "express";
import { CreateUserSchema } from "../middlewares/schema/user.schema";
import { authenticate } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import UserController from "../../modules/user/controllers/user.controller.ts";

const router = Router();

// Rotas para operações em todos os usuários
router.get("/", authenticate, UserController.findAll);
router.post("/", authenticate, validate(CreateUserSchema), UserController.create);

// Rotas para operações em um único usuário
router.get("/:id", authenticate, UserController.findOne);
router.patch("/:id", authenticate, UserController.update);
router.delete("/:id", authenticate, UserController.remove);

export default router;

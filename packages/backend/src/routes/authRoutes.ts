import { Router } from "express";
import {
  login as loginController,
  register as registerController,
} from "../controllers/authController";
import zodValidate from "../middlewares/zodValidate";
import { registerSchema } from "@auth/shared";

const router = Router();

router.post("/login", loginController);
router.post(
  "/register",
  zodValidate({ body: registerSchema }),
  registerController
);

export default router;

import { Router } from "express";
import {
  login as loginController,
  register as registerController,
  logout as logoutController,
} from "../controllers/authController";
import zodValidate from "../middlewares/zodValidate";
import { registerSchema, loginSchema } from "@auth/shared";

const router = Router();

router.post("/login", zodValidate({ body: loginSchema }), loginController);
router.post(
  "/register",
  zodValidate({ body: registerSchema }),
  registerController
);
router.get("/logout", logoutController);

export default router;

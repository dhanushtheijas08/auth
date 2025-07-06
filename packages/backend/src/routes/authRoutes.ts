import { Router } from "express";
import {
  login as loginController,
  register as registerController,
  logout as logoutController,
} from "../controllers/authController";
import zodValidate from "../middlewares/zodValidate";
import { registerSchema, loginSchema } from "@auth/shared";
import { REFRESH_TOKEN_PATH } from "../services/authCookies";

const router = Router();

router.post("/login", zodValidate({ body: loginSchema }), loginController);
router.post(
  "/register",
  zodValidate({ body: registerSchema }),
  registerController
);
router.get("/logout", logoutController);
router.get(REFRESH_TOKEN_PATH.replace("/auth", "/"), logoutController);

export default router;

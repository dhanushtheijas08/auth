import { Router } from "express";
import {
  login as loginController,
  register as registerController,
  logout as logoutController,
  generateNewAccessToken,
  verifyEmail,
  forgotPassword as forgotPasswordController,
  resetPassword as resetPasswordController,
} from "../controllers/authController";
import zodValidate from "../middlewares/zodValidate";
import {
  registerSchema,
  loginSchema,
  verificationCodeSchema,
  resetPasswordSchema,
} from "@auth/shared";
import { REFRESH_TOKEN_PATH } from "../services/authCookies";

const router = Router();

router.post("/login", zodValidate({ body: loginSchema }), loginController);
router.post(
  "/register",
  zodValidate({ body: registerSchema }),
  registerController
);
router.get("/logout", logoutController);
router.get(REFRESH_TOKEN_PATH.replace("/auth", "/"), generateNewAccessToken);
router.get(
  "/verify-email",
  zodValidate({ query: verificationCodeSchema }),
  verifyEmail
);
router.post(
  "/forgot-password",
  zodValidate({ body: registerSchema.pick({ email: true }) }),
  forgotPasswordController
);
router.post(
  "/reset-password",
  zodValidate({ body: resetPasswordSchema }),
  resetPasswordController
);

export default router;

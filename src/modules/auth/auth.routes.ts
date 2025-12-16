import { Router } from "express";
import { login, register, me, logout, refreshSession } from "./auth.controller";
import { loginLimiter } from "../../middlewares/rateLimiter";

const router = Router();

router.post("/login", loginLimiter, login);
router.post("/register", register);
router.get("/me", me);
router.post("/logout", logout);
router.post("/refresh", loginLimiter, refreshSession);




export default router;

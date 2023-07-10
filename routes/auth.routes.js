import { Router } from "express";
import { getLogin, updatePassword } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login", getLogin);
router.put("/changePassword", updatePassword);

export default router;

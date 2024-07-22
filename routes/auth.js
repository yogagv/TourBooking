import express from "express";
import { registerUser, userLogin } from "../controller/authController.js";

const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/userLogin", userLogin)

export default router;
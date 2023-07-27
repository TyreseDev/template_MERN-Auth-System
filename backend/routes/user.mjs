import express from "express";
import { loginUser, registerUser } from "../controllers/user.mjs";

const router = express.Router();

// @endpoint   POST /api/users/register
// @desc       Register users
// @access     public
router.post("/register", registerUser);

// @endpoint   POST /api/users/login
// @desc       Login the user
// @access     public
router.post("/login", loginUser);

export default router;

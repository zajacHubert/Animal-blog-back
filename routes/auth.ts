import { Router } from "express";
import { login, logout, register } from "../controllers/auth";

const router = Router();

router
    .post('/register', register)
    .post('/login', login)
    .post('/logout', logout)

export default router;
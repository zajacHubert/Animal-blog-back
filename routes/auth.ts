import { Router } from "express";

const router = Router();

router
    .post('/register', register)
    .post('/login', login)
    .post('/logout', logout)

export default router;
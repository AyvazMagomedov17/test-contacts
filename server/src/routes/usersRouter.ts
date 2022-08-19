import { Router } from "express";
import usersController from "../controllers/usersController.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = Router()

router.post('/register', usersController.createUser)
router.post('/login', usersController.login)
router.get('/auth', authMiddleware, usersController.auth)


export default router
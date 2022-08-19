import { Router } from "express";
import userRouter from './usersRouter.js'
import contactsRouter from './contactsRouter.js'
const router = Router()
router.use('/users', userRouter)
router.use('/contacts', contactsRouter)

export default router
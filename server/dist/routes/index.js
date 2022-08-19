import { Router } from "express";
import userRouter from './usersRouter.js';
import contactsRouter from './contactsRouter.js';
var router = Router();
router.use('/users', userRouter);
router.use('/contacts', contactsRouter);
export default router;

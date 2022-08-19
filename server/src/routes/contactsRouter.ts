import { Router } from 'express'
import contactsController from '../controllers/contactsController.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = Router()


router.post('/add', authMiddleware, contactsController.addContact)
router.get('/get', authMiddleware, contactsController.getContacts)
router.delete('/delete/:id', authMiddleware, contactsController.deleteContact)
router.put('/put', authMiddleware, contactsController.changeContact)
router.get('/getone/:id', authMiddleware, contactsController.getContact)



export default router
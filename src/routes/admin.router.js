import { Router } from 'express';
import validate from '../middlewares/validate.js';
import adminController from '../controllers/admin.controller.js'

const router = Router();

router.get('/admins?', adminController.GET);
router.post('/register', validate, adminController.REGISTER);
router.post('/login', validate, adminController.LOGIN);

export default router;
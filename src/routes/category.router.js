import { Router } from 'express';
import categoryController from '../controllers/category.controller.js'

const router = Router();

router.get('/category', categoryController.GET_CATEGORY);
router.get('/subcategory', categoryController.GET_SUB_CATEGORY);

export default router;
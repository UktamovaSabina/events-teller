import { Router } from 'express';
import validate from '../middlewares/validate.js';
import postsController from '../controllers/posts.controller.js';
import checkToken from '../middlewares/check-token.js';

const router = Router();

router.get('/posts/public', postsController.GET_PUBLIC);
router.get('/posts', checkToken, postsController.GET_ALL);
router.get('/posts/:id', postsController.GET_SINGLE_POST); 
router.post('/posts', checkToken, validate, postsController.POST);
router.put('/posts/:id', checkToken, postsController.PUT);
router.delete('/posts/:id', checkToken, postsController.DELETE);

export default router;
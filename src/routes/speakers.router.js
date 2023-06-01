import { Router } from "express";
import speakersController from '../controllers/speakers.controller.js';
import validate from '../middlewares/validate.js';
import checkToken from '../middlewares/check-token.js';

const router = Router();

router.get('/speakers', speakersController.GET);
router.post('/speakers',checkToken, validate, speakersController.POST);
router.put('/speakers/:id', checkToken, speakersController.PUT);
router.delete('/speakers/:id', checkToken, speakersController.DELETE);

export default router;
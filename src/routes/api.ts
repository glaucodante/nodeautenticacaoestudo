import { Router } from 'express';
import { Auth } from '../middlewares/auth'
import * as ApiController from '../controllers/apiController';

const router = Router();

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);

// o list deve ser privado, protegendo o endpoint
//  Auth.private = rota privada = middleware
router.get('/list', Auth.private, ApiController.list);

export default router;
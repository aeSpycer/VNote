import { Router } from 'express';
import { signup, login, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { signupSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/signup', validateSchema(signupSchema), signup);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);

router.get('/verify', verifyToken);

router.get('/profile', authRequired, profile);

export default router;
import { Router } from 'express';
import { register, login, refreshToken, logout } from '../controllers/auth.js';
import { validateRegistration, validateLogin } from '../middleware/validation.js';

const router = Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export { router as authRouter };
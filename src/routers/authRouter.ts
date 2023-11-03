import express, { Router } from 'express';
import { getMe, login, register } from '../controllers/authController';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login',login)
router.get('/me',getMe)

export default router;

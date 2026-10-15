import { Router } from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (Bearer token required)
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;

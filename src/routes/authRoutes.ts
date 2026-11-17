import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { loginSchema } from '../dto/auth.dto';
import { asyncHandler } from '../utils/asyncHandler';
import { authMiddleware } from '../middleware/auth';
console.log('AuthController:', AuthController);
console.log('Login:', AuthController?.login);
console.log('GetMe:', AuthController?.getMe);


export const authRoutes = Router();


// POST /api/auth/login - Public endpoint
authRoutes.post(
   '/login',
   validate(loginSchema),
   asyncHandler(AuthController.login)
);


// GET /api/auth/me - Protected endpoint (requires token)
authRoutes.get(
   '/me',
   authMiddleware,
   asyncHandler(AuthController.getMe)
);

import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { VerificationController } from '../controllers/verificationController';
import { validate } from '../middleware/validate';
import { loginSchema } from '../dto/auth.dto';
import { asyncHandler } from '../utils/asyncHandler';
import { authMiddleware } from '../middleware/auth';
import { verificationRoutes } from './verificationRoutes';
console.log('AuthController:', AuthController);
console.log('Login:', AuthController?.login);
console.log('GetMe:', AuthController?.getMe);


export const authRoutes = Router();

// Mount verification routes
authRoutes.use('/', verificationRoutes); 

// POST /api/auth/register
authRoutes.post(
    '/register',
    asyncHandler(VerificationController.register)
);

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

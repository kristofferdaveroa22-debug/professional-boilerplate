import 'reflect-metadata';
import express from 'express';
import { config } from './config/env';
import { AppDataSource } from './config/data-source';
import { logger } from './utils/logger';

import {
    helmetMiddleware,
    corsMiddleware,
    apiLimiter
} from './middleware/security';

import { requestLoggingMiddleware } from './middleware/requestLogger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Import routes
import { userRoutes } from './routes/userRoutes';
import { healthRoutes } from './routes/healthRoutes';
import { authRoutes } from './routes/authRoutes';

const app = express();

// Security middleware
app.set('trust proxy', 1);
app.use(helmetMiddleware);
app.use(corsMiddleware);

// Request parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// API middleware
app.use('/api/', apiLimiter);
app.use(requestLoggingMiddleware);

// Register routes
app.use('/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    try {
        // Connect to database
        await AppDataSource.initialize();
        logger.info('Database connected successfully');

        // Run migrations in production
        if (config.isProd) {
            await AppDataSource.runMigrations();
            logger.info('Migrations executed');
        }

        // Start server
        const server = app.listen(config.port, () => {
            logger.info(`Server running on port ${config.port}`);
            logger.info(`Environment: ${config.env}`);
            logger.info(`Healthcheck: http://localhost:${config.port}/health`);
        });

        // Graceful shutdown
        const gracefulShutdown = async (signal: string) => {
            logger.info(`${signal} received. Starting graceful shutdown...`);

            server.close(async () => {
                logger.info('HTTP server closed');

                await AppDataSource.destroy();

                logger.info('Database connection closed');
                logger.info('Graceful shutdown complete');

                process.exit(0);
            });

            setTimeout(() => {
                logger.error('Forced shutdown due to timeout');
                process.exit(1);
            }, 10000);
        };

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

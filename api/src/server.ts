import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from './config/db';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/error';
import { ApiHealthResponse, ApiResponse } from './types/api.types';

// Load environment configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

// 1. Security Headers via Helmet
app.use(helmet());

// 2. CORS configuration
app.use(
  cors({
    origin: [CORS_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 3. Body Parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 4. Rate Limiter for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 200, // Max 200 requests per window
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this client. Please try again after 15 minutes.',
  },
});
app.use('/api', apiLimiter);

// 5. Health Check Endpoint
app.get('/api/health', (_req: Request, res: Response<ApiResponse<ApiHealthResponse>>) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  res.status(isDbConnected ? 200 : 503).json({
    success: isDbConnected,
    message: isDbConnected ? 'CampusConnect API is healthy' : 'Database connection unavailable',
    data: {
      status: isDbConnected ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        connected: isDbConnected,
        host: mongoose.connection.host || undefined,
        database: mongoose.connection.name || undefined,
      },
    },
  });
});

// 6. Application Routes
app.use('/api/auth', authRoutes);

// 7. 404 Route Handler
app.use((req: Request, res: Response<ApiResponse>) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.method} ${req.originalUrl}' not found.`,
  });
});

// 8. Global Error Handler Middleware
app.use(errorHandler);

// 9. Server Initialization & MongoDB Connection
async function startServer(): Promise<void> {
  try {
    // Attempt DB connection
    await connectDatabase();

    const server = app.listen(PORT, () => {
      console.log(`[Server] CampusConnect API running on http://localhost:${PORT}`);
      console.log(`[Server] Environment: ${process.env.NODE_ENV ?? 'development'}`);
    });

    // Graceful Shutdown
    const handleShutdown = async (signal: string) => {
      console.log(`\n[Server] Received ${signal}. Initiating graceful shutdown...`);
      server.close(async () => {
        console.log('[Server] HTTP server closed');
        await disconnectDatabase();
        process.exit(0);
      });
    };

    process.on('SIGINT', () => void handleShutdown('SIGINT'));
    process.on('SIGTERM', () => void handleShutdown('SIGTERM'));
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[Server] Fatal startup error: ${errorMsg}`);
    console.warn('[Server] Starting Express server in degraded mode to allow frontend health inspection.');

    app.listen(PORT, () => {
      console.log(`[Server] CampusConnect API running in degraded mode on http://localhost:${PORT}`);
    });
  }
}

void startServer();

export default app;

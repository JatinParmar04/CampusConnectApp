import mongoose from 'mongoose';

interface MongoConnectionState {
  isConnected: boolean;
  host: string;
  database: string;
}

const connectionState: MongoConnectionState = {
  isConnected: false,
  host: '',
  database: '',
};

/**
 * Connect to MongoDB with robust connection options, error listeners,
 * and graceful process termination handling.
 */
export async function connectDatabase(): Promise<MongoConnectionState> {
  const mongoUri: string | undefined = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
  }

  try {
    const connectionInstance = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    connectionState.isConnected = true;
    connectionState.host = connectionInstance.connection.host;
    connectionState.database = connectionInstance.connection.name;

    console.log(
      `[Database] Successfully connected to MongoDB at ${connectionState.host}/${connectionState.database}`
    );

    mongoose.connection.on('error', (err: Error) => {
      console.error(`[Database] Connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[Database] Lost connection to MongoDB');
      connectionState.isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('[Database] Reconnected to MongoDB');
      connectionState.isConnected = true;
    });

    return connectionState;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown database connection error';
    console.error(`[Database] Initial MongoDB connection failed: ${errorMessage}`);
    throw error;
  }
}

/**
 * Gracefully close database connection on shutdown
 */
export async function disconnectDatabase(): Promise<void> {
  if (connectionState.isConnected) {
    await mongoose.connection.close();
    connectionState.isConnected = false;
    console.log('[Database] MongoDB connection closed gracefully');
  }
}

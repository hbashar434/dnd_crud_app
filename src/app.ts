import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApiError } from './utils/ApiError';
import userRoutes from './features/user/userRoutes';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new ApiError(403, 'Not allowed by CORS'));
    }
  },
};

// CORS middleware
app.use(cors(corsOptions));

// middleware
app.use(express.json());

// user routes
app.use('/api/v1/users', userRoutes);

// root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World! Server is running...');
});

// error handling middleware
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// start the server
app.listen(PORT, (): void => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

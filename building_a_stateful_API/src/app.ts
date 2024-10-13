// src/app.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
import productsRoutes from './routes/products';
import { requestLogger } from './middlewares/requestLogger';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/v1/products', productsRoutes);

// Error Handling Middleware (should be after all routes and middlewares)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

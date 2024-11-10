import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { coursesRouter } from './routes/courses.js';
import { labsRouter } from './routes/labs.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authenticate } from './middleware/authenticate.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/courses', authenticate, coursesRouter);
app.use('/api/labs', authenticate, labsRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
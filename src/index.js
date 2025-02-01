import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { router as faqRouter } from './routes/faq.js';
import { errorHandler } from './middleware/errorHandler.js';
import './config/redis.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false, 
  keyGenerator: (req) => {
    
    return req.ip || 
           req.headers['x-forwarded-for'] || 
           req.headers['x-real-ip'] || 
           req.connection.remoteAddress || 
           'unknown-ip';
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests, please try again later.'
    });
  }
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(limiter);

app.use('/api/faqs', faqRouter);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
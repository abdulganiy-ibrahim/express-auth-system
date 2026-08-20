import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from './auth/auth.route.js';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
    ]
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

export default app;
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from './auth/auth.route.js';
import userRoutes from './user/user.route.js';
import projectRoutes from './project/project.route.js';

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);

export default app;
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from './auth/auth.route.js';
import userRoutes from './user/user.route.js';
import projectRoutes from './project/project.route.js';
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);

// error middleware
app.use(errorMiddleware)

export default app;
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from './auth/auth.route.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', authRoutes);

export default app;
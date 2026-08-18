import express from "express";
import authRoutes from './auth/auth.route.js';

const app = express();

app.use(express.json());

app.use('/', authRoutes);

export default app;
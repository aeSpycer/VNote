import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "https://vnote-2cy7.onrender.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  next();
  
});

app.use(cors({
  origin: 'https://vnote-f.onrender.com', // Reemplaza con el dominio de tu frontend
  credentials: true // Habilita el intercambio de cookies entre dominios
}));

app.use(cors({ origin: process.env.FRONTEND_URL || "https://vnote-2cy7.onrender.com", credentials: true}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

export default app;

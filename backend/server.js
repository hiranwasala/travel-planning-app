import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 5000;


connectDB();

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'], 
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/places', placeRoutes);

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'assets/images')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();

const app = express();
// app.use(cors({
//   origin: 'http://localhost:5173', // Replace with your frontend origin
//   methods: 'GET,PUT,POST,DELETE',
//   allowedHeaders: 'Content-Type,Authorization,userid',
// }));
const allowedOrigins = [
  'http://localhost:5173',
  'https://image-generator-frontend-neon.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in the list of allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization,userid',
};

app.use(cors(corsOptions));
// app.use(cors({
//   origin: 'http://localhost:5173', // Update this with your frontend origin
//   optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
// }));
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api',userRoutes);
app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8081, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();

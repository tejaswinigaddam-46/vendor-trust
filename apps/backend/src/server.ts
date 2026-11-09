import express from 'express';
import cors  from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/database';

dotenv.config();

const app = express();

app.use(cors({
	origin: 'http://localhost:5173'
}));

app.use(express.json());

app.get('/api/health', (req,res) => {

res.status(200).json({
	success:true,
	message: 'Vendor Trust API is running'
	});
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
console.log(`Server running on port ${PORT}`);
});
app.get('/api/health/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      success: true,
      database: 'connected',
      timestamp: result.rows[0].now
    });
  } catch (error) {
    console.error(error);

    res.status(503).json({
      success: false,
      database: 'disconnected'
    });
  }
});

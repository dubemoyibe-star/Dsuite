import express from 'express';
import "dotenv/config";
import { roomsRouter } from './routes/roomsRoute.js';
import { apiKeyAuth } from './middleware/apiKeyAuth.js';
import cors from 'cors';


const app = express();

const PORT = 8000;

app.use(express.json());

//app.use("/api", apiKeyAuth);
app.use('/api', roomsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
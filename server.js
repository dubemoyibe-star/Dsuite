import express from 'express';
import "dotenv/config";
import { roomsRouter } from './routes/roomsRoute.js';
import { authRouter } from './routes/authRoute.js';
import { bookingsRouter } from './routes/bookingsRoute.js';
import { meRouter } from './routes/meRouter.js';
import session from 'express-session';
import { apiKeyAuth } from './middleware/apiKeyAuth.js';
import cors from 'cors';


const app = express();

const PORT = 8000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());


app.use(
  session({
    name: "hotel.sid",
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 
    }
  })
);
app.use('/api/auth', authRouter);
app.use('/api/auth/me', meRouter);

app.use('/api', apiKeyAuth);
app.use('/api/rooms', roomsRouter);
app.use('/api/bookings', bookingsRouter)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
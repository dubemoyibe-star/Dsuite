import express from "express";
import "dotenv/config";
import session from "express-session";
import { RedisStore } from "connect-redis";
import redisClient from "./config/redis.js";
import cors from "cors";
import fs from "fs";

import { roomsRouter } from "./routes/roomsRoute.js";
import { authRouter } from "./routes/authRoute.js";
import { bookingsRouter } from "./routes/bookingsRoute.js";
import { meRouter } from "./routes/meRouter.js";
import { messagesRouter } from "./routes/messagesRoute.js";
import { adminMessagesRouter } from "./routes/adminMessagesRoute.js";
// import { apiKeyAuth } from "./middleware/apiKeyAuth.js";

const app = express();

const PROD_DB_PATH = "/var/data/database.db";
const SOURCE_DB_PATH = "./database.db";

if (
  process.env.NODE_ENV === "production" &&
  !fs.existsSync(PROD_DB_PATH)
) {
  fs.mkdirSync("/var/data", { recursive: true });
  fs.copyFileSync(SOURCE_DB_PATH, PROD_DB_PATH);
  console.log("Database copied to Render persistent disk");
}
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || "development";
const allowedOrigin = process.env.FRONTEND_URL
app.use(
  cors({
    origin: allowedOrigin, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



app.use(express.json());

app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      prefix: "booking:sess:",
    }),
    name: "hotel.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);

app.use("/api/auth", authRouter);
app.use("/api/me", meRouter);

// app.use("/api", apiKeyAuth);
app.use("/api/rooms", roomsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/admin/messages", adminMessagesRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
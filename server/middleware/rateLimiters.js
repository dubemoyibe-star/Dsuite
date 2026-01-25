import {rateLimit } from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redisClient from "../config/redis.js";
import { RATE_LIMITS } from "../config/rateLimits.js";

export const generalLimiter = rateLimit({
  windowMs: RATE_LIMITS.GENERAL.windowMs,
  limit: RATE_LIMITS.GENERAL.limit,
  skip: (req) => req.path.startsWith("/auth"),
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: "rl:general:" 
  }),
});

export const authLimiter = rateLimit({
  windowMs: RATE_LIMITS.AUTH.windowMs,
  limit: RATE_LIMITS.AUTH.limit,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: "rl:auth:", 
  }),
});

export const bookingLimiter = rateLimit({
  windowMs: RATE_LIMITS.BOOKING.windowMs,
  limit: RATE_LIMITS.BOOKING.limit,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.user?.id,
  message: { error: "Too many booking attempts. Slow down." },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: "rl:booking:" 
  }),
});
export const RATE_LIMITS = {
  AUTH: {
    limit: Number(process.env.LOGIN_LIMIT) || 5,
    windowMs: Number(process.env.LOGIN_WINDOW_MS) || 60_000,
  },
  BOOKING: {
    limit: Number(process.env.BOOKING_LIMIT) || 20,
    windowMs: Number(process.env.BOOKING_WINDOW_MS) || 60_000,
  },
  GENERAL: {
    limit: Number(process.env.GENERAL_LIMIT) || 100,
    windowMs: Number(process.env.GENERAL_WINDOW_MS) || 60_000,
  },
};
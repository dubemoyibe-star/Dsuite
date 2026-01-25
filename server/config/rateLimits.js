export const RATE_LIMITS = {
  AUTH: {
    limit: Number(process.env.LOGIN_LIMIT),
    windowMs: Number(process.env.LOGIN_WINDOW_MS),
  },
  BOOKING: {
    limit: Number(process.env.BOOKING_LIMIT),
    windowMs: Number(process.env.BOOKING_WINDOW_MS),
  },
  GENERAL: {
    limit: Number(process.env.GENERAL_LIMIT),
    windowMs: Number(process.env.GENERAL_WINDOW_MS),
  },
};
import rateLimit from "express-rate-limit";

// General rate limiter: applied to all API routes
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
  message: {
    success: false,
    data: null,
    error: "Too many requests from this IP, please try again after 15 minutes."
  }
});

// Strict rate limiter: applied to contact forms and newsletters
export const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 form submissions per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    error: "Too many submissions from this IP, please wait an hour before submitting again."
  }
});

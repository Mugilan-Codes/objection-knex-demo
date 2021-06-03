import rateLimit from 'express-rate-limit';

// TODO: Setup custom rate limiter (redis or mongo or something else)
// REF: Rate Limiting - https://blog.logrocket.com/rate-limiting-node-js/
// TODO: Create different limiters

const FIFTEEN_MINUTES_IN_MILLISECONDS = 15 * 60 * 1000; // 15 minutes in milliseconds

const options = {
  windowMs: FIFTEEN_MINUTES_IN_MILLISECONDS,
  max: 100,
  message: 'You have exceeded the 100 requests in 15 mins limit!',
  headers: true,
};

const rateLimiter = rateLimit(options);

export default rateLimiter;

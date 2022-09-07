const rateLimit = require('express-rate-limit');

module.exports = rateLimiterUsingThirdParty = rateLimit({
  windowMs: 1 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 10,
  message: 'You have exceeded the request limit!',
  headers: true,
});
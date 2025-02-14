import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET; // Retrieve the secret key from .env

// Middleware to check if token exists and is valid
export const jwtMiddleware = (controller) => async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(' ')[1];
    try {
      const jwtContent = jwt.verify(token, jwtSecret);
      req.user = jwtContent;
    } catch (err) {
      console.log('Invalid token', err);
    }
  }
  next();
};

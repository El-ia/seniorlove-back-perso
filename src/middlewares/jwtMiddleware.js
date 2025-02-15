import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET; // Retrieve the secret key from .env

// Middleware to check if token exists and is valid
export const jwtMiddleware = (controller) => async (req, res, next) => {
  console.log("token d'authentification",req.cookies.token)
  const token = req.cookies.token; // Utiliser req.cookies.token pour récupérer le token
  if (token) {
    try {
      const jwtContent = jwt.verify(token, jwtSecret);
      req.user = jwtContent;
      console.log('req.user dans le middleware:', req.user); // Ajouter ce log pour vérifier req.user
      await controller(req,res,next);
    } catch (err) {
      console.log('Invalid token', err);
      return res.status(401).json({ error: 'Token invalide.' });
    }
  } else {
    return res.status(401).json({ error: 'Token non fourni.' });
  }
  next();
};

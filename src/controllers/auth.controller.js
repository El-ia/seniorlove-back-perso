import jwt from 'jsonwebtoken';
import passwordValidator from "password-validator";
import * as argon2 from "argon2";
import { Role, User } from "../models/associations.js";
import { setCookie } from "../middlewares/cookieMiddleware.js";

const jwtSecret = process.env.JWT_SECRET; // Retrieve the secret key from .env

export const authController = {

  // Handle user sign-up
  async signUp(req, res) {
    try {
      const { email, password, firstname, gender, age, height, marital, pet, city } = req.body;

      // Validate required fields
      if (!email || !password || !firstname || !gender || !age || !height || !marital || !pet || !city) {
        return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis.' });
      }

      // Configure password validator
      const passwordSchema = new passwordValidator();
      passwordSchema
        .is().min(8)
        .is().max(100)
        .has().uppercase()
        .has().lowercase()
        .has().digits(1)
        .has().not().spaces();

      // Validate password
      if (!passwordSchema.validate(password)) {
        return res.status(400).json({
          error: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre, et ne doit pas contenir d’espaces.',
        });
      }

      // Check if email is already in use
      const existingUser = await User.findOne({
        where: { email },
        include: [{
          model: Role,
          as: "role"
        }]
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Un utilisateur avec cet email existe déjà.' });
      }

      // Hash the password
      //const hashedPassword = await argon2.hash(password);

      // Create the user
      const newUser = await User.create({
        email,
        password, //hashedPassword,
        firstname,
        gender,
        age,
        height,
        marital,
        pet,
        city,
      });

      // Save user to database
      await newUser.save();

      // Generate JWT
      const jwtContent = { userId: newUser.id };// Create JWT payload with user ID
      const jwtOptions = { algorithm: 'HS256', expiresIn: '3h' };// Define JWT options, setting the algorithm and expiration time
      const token = jwt.sign(jwtContent, jwtSecret, jwtOptions);// Sign the JWT using the secret key and options


      // Return the token and user info
      return res.status(201).json({ 
        message: 'Utilisateur créé avec succès.', 
        logged: true, 
        pseudo: newUser.firstname,
        token 
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Une erreur est survenue lors de la création de l’utilisateur.' });
    }
  },


  // Handle user sign-in
  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      // Validate fields
      if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont obligatoires.' });
      }

      // Find the user
      const user = await User.findOne({
        where: { email },
        include: [{
          model: Role,
          as: "role"
        }]
      });

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }

      // Verify password
      /*const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Mot de passe incorrect.' });
      }*/
      const options = {
        maxAge: 1000 * 60 * 15, // expire after 15 minutes
        httpOnly: true, // Cookie will not be exposed to client side code
        sameSite: "none", // If client and server origins are different
        secure: true // use with HTTPS only
      };
      // Generate JWT
      const jwtContent = { userId: user.id }; // Create JWT payload with user ID
      const jwtOptions = { algorithm: 'HS256', expiresIn: '3h' }; // Define JWT options, setting the algorithm and expiration time
      const token = jwt.sign(jwtContent, jwtSecret, jwtOptions); // Sign the JWT using the secret key and options

      res.cookie("token", token, options);

      // Return the token and user info
      return res.status(200).json({ 
        message: 'Connexion réussie.', 
        logged: true, 
        pseudo: user.firstname,
        //token 
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Une erreur est survenue lors de la connexion.' });
    }
  },
};

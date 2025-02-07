import passwordValidator from "password-validator";
import * as argon2 from "argon2";
import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js"; // A REVOIR

export const authController = {

  // Render the sign-up page
  signUpPage(req, res) {
    res.render("/api/inscription");
  },
  
  // Handle user sign-up
  async signUp(req, res) {
    //console.log("Un utilisateur essaie de s'inscrire");
    try {
      // Retrieve form data (body parser already set up in index)
      const { email, password, firstname, gender, age, height, marital, pet, city } = req.body;
  
      // Validate required fields
      if (!email || !password || !firstname || !gender || !age || !height || !marital || !pet || !city) {
        return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis.' });
      }
  
      // Configure password validator
      const passwordSchema = new passwordValidator();
      passwordSchema
        .is().min(8) // Minimum 8 characters
        .is().max(100) // Maximum 100 characters
        .has().uppercase() // At least one uppercase letter
        .has().lowercase() // At least one lowercase letter
        .has().digits(1) // At least one digit
        .has().not().spaces(); // No spaces
  
      // Validate password
      if (!passwordSchema.validate(password)) {
        return res.status(400).json({
          error: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre, et ne doit pas contenir d’espaces.',
        });
      }
  
      // Check if email is already in use
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Un utilisateur avec cet email existe déjà.' });
      }
  
      // Hash the password
      const hashedPassword = await argon2.hash(password);
      //console.log(hashedPassword);
  
      // If everything is okay, create the user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        firstname,
        gender,
        age,
        height,
        marital,
        pet,
        city,
      });
     
      // Save user to database
      newUser.save();
      
      // Redirect to login page
      res.redirect("/api/connexion");
      return res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Une erreur est survenue lors de la création de l’utilisateur.' });
    }
  },

  signInPage(req, res) {
    res.render("/api/connexion");
  },

  // Connexion d'un utilisateur
  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      // Validation des champs
      if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont obligatoires.' });
      }

      // Recherche de l'utilisateur
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }

      // Vérification du mot de passe
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Mot de passe incorrect.' });
      }

      // si tout est ok
      // on va stocker en session l'id de l'utilisateur
      // l'idée c'est de verifier à chaque requete, que l'utilisateur a bien les droits auquel il prétend
      req.session.userId = user.id;
      // puis on redirige vers la home
      res.redirect("/");

      return res.status(200).json({ message: 'Connexion réussie.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Une erreur est survenue lors de la connexion.' });
    }
  },
};


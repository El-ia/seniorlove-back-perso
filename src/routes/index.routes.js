import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";




export const router = new Router();

//home page



//users

router.route("/api/inscription")
  .get(authController.signUpPage)
  .post(authController.signUp);


router.route("/api/connexion")
  .get(authController.signInPage)
  .post(authController.signIn);

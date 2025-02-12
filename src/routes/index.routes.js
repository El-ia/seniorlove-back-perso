import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";




export const router = new Router();

//home page



//users

router.route("/api/inscription")
  .post(authController.signUp);
  


router.route("/api/connexion")
  .post(authController.signIn);

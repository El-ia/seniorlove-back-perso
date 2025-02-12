import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";




export const router = new Router();

//home page



//users

router.route("/api/signup")
  .post(authController.signUp);
  
router.route("/api/signin")
  .post(authController.signIn);

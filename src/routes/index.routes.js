import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";




export const router = new Router();

//home page



//users

router.get("/api/inscription", authController.signUpPage);
router.post("/api/inscription", authController.signUp);


router.get("/api/connexion", authController.signInPage);
router.post("/api/connexion", authController.signIn);

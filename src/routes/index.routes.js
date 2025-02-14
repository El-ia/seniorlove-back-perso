import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { eventController } from "../controllers/event.controller.js";




export const router = new Router();

//home page



//users

router.route("/api/signup")
  .post(authController.signUp);
  
router.route("/api/signin")
  .post(authController.signIn);

router.route("/api/filterevent")
  .get(eventController.lastEvent);

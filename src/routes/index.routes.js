import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { eventController } from "../controllers/event.controller.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import { userController } from "../controllers/user.controller.js";
// utliser une fois connecté, sur les routes, le middleware JWT(comme controllerWrapper) 




export const router = new Router();

//home page





// Route for user signup
router.route("/api/signup")
  .post(authController.signUp);

// Route for user signin
router.route("/api/signin")
  .post(authController.signIn);

// Route to filter events
router.route("/api/filterevent")
  .get(eventController.lastEvent);

// Route to get account details
router.route("/api/myaccount/:id(\\d+)")
  .get(userController.getAccountDetails);

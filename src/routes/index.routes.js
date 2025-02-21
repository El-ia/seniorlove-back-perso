import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { eventController } from "../controllers/event.controller.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import { userController } from "../controllers/user.controller.js";
// utliser une fois connecté, sur les routes, le middleware JWT(comme controllerWrapper) 




export const router = new Router();

// Routes for homepage conected

router.route("/api/homepage-events")
  .get(jwtMiddleware(eventController.connectedEvent));

router.route("/api/homepage-profiles")
  .get(jwtMiddleware(userController.connectedProfile));


// Route for user signup
router.route("/api/signup")
  .post(authController.signUp);

// Route for user signin
router.route("/api/signin")
  .post(authController.signIn);

router.route("/api/verify-token")
  .get(jwtMiddleware(authController.verifyToken));


// Route to filter events
router.route("/api/filter-event")
  .get(eventController.lastEvent);

  
router.route("/api/my-account")
  .get(jwtMiddleware(userController.getAccountDetails)) // Route to get account details
  .patch(jwtMiddleware(userController.updateAccountDetails)) // Define the update account details
  .delete(jwtMiddleware(userController.deleteAccount)); // Define the delete account route

import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { eventController } from "../controllers/event.controller.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import { userController } from "../controllers/user.controller.js";
import { errorHandler } from "../middlewares/isErrorHandlerMiddleware.js";
// utliser une fois connecté, sur les routes, le middleware JWT(comme controllerWrapper) 




export const router = new Router();

// Routes for homepage conected

router.route("/api/homepage-events")
  .get(jwtMiddleware,errorHandler(eventController.connectedEvent));

router.route("/api/homepage-profiles")
  .get(jwtMiddleware,errorHandler(userController.connectedProfile));


// Route for user signup
router.route("/api/signup")
  .post(errorHandler(authController.signUp));

// Route for user signin
router.route("/api/signin")
  .post(errorHandler(authController.signIn));

router.route("/api/verify-token")
  .get(jwtMiddleware,errorHandler(authController.verifyToken));

// Route 
router.route("/api/logout")
  .post(jwtMiddleware,errorHandler(authController.logout));

// Route to filter events
router.route("/api/filter-event")
  .get(errorHandler(eventController.lastEvent));

// Route to get all events
router.route("/api/events")
  .get(eventController.getAllEvents);
  
router.route("/api/my-account")
  .get(jwtMiddleware,errorHandler(userController.getAccountDetails)) // Route to get account details
  .patch(jwtMiddleware,errorHandler(userController.updateAccountDetails)) // Define the update account details
  .delete(jwtMiddleware,errorHandler(userController.deleteAccount)); // Define the delete account route

router.use((req, res) => {
  res.status(404).json({error: 'Not found'});
});
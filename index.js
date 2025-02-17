import "dotenv/config";
import express from "express";
import { router } from "./src/routes/index.routes.js";
import cors from "cors"; // Import cors
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { jwtMiddleware } from "./src/middlewares/jwtMiddleware.js"; // Import JWT middleware

const app = express();

// Helmet permitted to secure the API by setting various HTTP headers
app.use(helmet());

// CORS module: specify who can access the API
app.use(cors({
  origin: "http://localhost:5173", // * = allow everyone (not a best practice, but it's fine for local development),
  credentials: true,
  methods: "GET, PUT, POST, DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

// Add JWT middleware to add user to req if token exists and is valid
//app.use(jwtMiddleware);

// Error handling middleware
// app.use(errorHandler);
app.use(cookieParser());
// Body parser configuration (to retrieve form data)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Allow interpreting data provided in a POST, PATCH, or PUT request as JSON

// Use cookie middleware
//app.use(setCookie);

// Use routes
app.use(router);


// Start a server
const PORT = process.env.PORT || 3000; // Fallback value if process.env.PORT is undefined, default to port 3000
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});

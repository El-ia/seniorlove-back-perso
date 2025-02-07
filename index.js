import "dotenv/config";
import express, { Router } from "express";
import { router } from "./src/routes/index.routes.js";

const app = express();

// Configure the body parser (to retrieve form data)
app.use(express.urlencoded({ extended: true }));

// BodyParser allowing to interpret data provided in a POST, PATCH, or PUT request as JSON. This data will be stored in req.body
app.use(express.json());

app.use(router);

// Start a server
const PORT = process.env.PORT || 3000; // Fallback value if process.env.PORT === undefined, the server will default to port 3000
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});

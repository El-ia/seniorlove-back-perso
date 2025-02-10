import "dotenv/config";
import express from "express";
//import { router } from "./src/routes/index.routes.js";

//security
import cors from "cors"; // Import cors


const app = express();

// CORS module: specify who can access the API
app.use(cors({
  // origin: ["myfrontend1.com, myfrontend2.fr"]
  origin: "*" // * = allow everyone (not a best practice, but it's fine for local development)
}));


// Body parser configuration (to retrieve form data)
app.use(express.urlencoded({ extended: true }));

// Allow interpreting data provided in a POST, PATCH, or PUT request as JSON
app.use(express.json());

//app.use(router);
app.json("greetting");
// Start a server
const PORT = process.env.PORT || 3000; // Fallback value if process.env.PORT is undefined, default to port 3000
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});

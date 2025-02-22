import express from "express";
import cors from "cors"; // Corrected import
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser"; // Corrected import
import path from "path";

const FRONTEND_URL = process.env.FRONTEND_URL;
dotenv.config();

const app = express();

app.use(cors()); // Corrected usage
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Corrected usage

// Routes
app.use("/api", routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back index.html.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);

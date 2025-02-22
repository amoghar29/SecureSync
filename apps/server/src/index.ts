import express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import routes from "./routes/index.js";
import * as cookieParser from "cookie-parser";
import * as path from "path";

const FRONTEND_URL = process.env.FRONTEND_URL;
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

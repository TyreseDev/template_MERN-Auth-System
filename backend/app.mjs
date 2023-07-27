import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import passportConfig from "./config/passport.mjs";
import userRoutes from "./routes/user.mjs";
import { NODE_ENV } from "./config/index.mjs";

const app = express();
const corsOptions = {
  origin: true, // Replace with your allowed origin(s)
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Specify the HTTP methods allowed
  allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed request headers
  credentials: true, // Enable sending cookies across different domains
  preflightContinue: false, // Disable preflight requests caching
  optionsSuccessStatus: 200, // Set the response status code for successful OPTIONS requests
};
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: false }));
app.use(passport.initialize());

// Configure Passport
passportConfig(passport);

// Routes
app.use("/api/users", userRoutes);

if (NODE_ENV === "production") {
  // Production
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // Set static folder
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  // Development
  app.get("*", (req, res) => {
    res.status(400).send("Bad Request!");
  });
}

export default app;

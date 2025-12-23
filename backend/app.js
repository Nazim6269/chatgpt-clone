import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express from "express";
import router from "./routes/route.js";
import { clientUrl, prodClientUrl } from "./secret.js";

const app = express();

const allowedOrigins = [clientUrl, prodClientUrl];

const middlewareArray = [
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("CORS blocked"));
    },
    credentials: true,
  }),
  clerkMiddleware(),
  express.json(),
  express.urlencoded({ extended: true }),
];

// using middleware
app.use(middlewareArray);
app.use("/", router);

export default app;

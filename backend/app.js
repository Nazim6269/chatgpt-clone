import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express from "express";
import router from "./routes/route.js";

const app = express();

const middlewareArray = [
  cors({
    origin: process.env.CLIENT_URL,
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

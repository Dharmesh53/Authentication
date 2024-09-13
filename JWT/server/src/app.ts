import "dotenv/config";
import { createServer } from "http";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import router from "./router";

const app = express();

app.use(
  cors({
    origin: process.env.X_CORS_ORIGIN === "*" ? "*" : process.env.X_CORS_ORIGIN?.split(","),
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/v1", router);

export const httpServer = createServer(app);

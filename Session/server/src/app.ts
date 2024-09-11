import "dotenv/config";
import { createServer } from "http";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import morganMiddleware from "logger/morgan.logger";
import cors from "cors";
import helmet from "helmet";
import router from "router";

const app = express();

app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN_X === "*"
        ? "*"
        : process.env.CORS_ORIGIN_X?.split(","),
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/v1", router());

app.use(morganMiddleware);

export const httpServer = createServer(app);

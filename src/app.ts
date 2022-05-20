import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./routes";

export const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (request: Request, response: Response) => {
  return response.end("hello world");
});

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "Error",
      message: "Internal server error",
    });
  }
);

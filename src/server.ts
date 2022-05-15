import cors from "cors";
import express, { Request, Response } from "express";
import "express-async-errors";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (request: Request, response: Response) => {
  return response.end("hello world");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

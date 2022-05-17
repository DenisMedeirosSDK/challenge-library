import { Router } from "express";
import { CreateBookController } from "./controllers/create-book-controller";
import { CreateLibraryController } from "./controllers/create-library-controller";

const createLibraryController = new CreateLibraryController();
const createBookController = new CreateBookController();

export const routes = Router();

routes.post("/library", createLibraryController.handle);
routes.post("/book", createBookController.handle);

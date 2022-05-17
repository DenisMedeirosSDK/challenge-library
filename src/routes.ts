import { Router } from "express";
import { CreateBookController } from "./controllers/create-book-controller";
import { CreateLibraryController } from "./controllers/create-library-controller";
import { UpdateBookController } from "./controllers/update-book-controller";

const createLibraryController = new CreateLibraryController();
const createBookController = new CreateBookController();
const updateBookController = new UpdateBookController();

export const routes = Router();

routes.post("/library", createLibraryController.handle);
routes.post("/book", createBookController.handle);
routes.put("/book", updateBookController.handle);

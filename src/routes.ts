import { Router } from "express";
import { CreateLibraryController } from "./controllers/create-library-controller";

const createLibraryController = new CreateLibraryController();

export const routes = Router();

routes.post("/library", createLibraryController.handle);

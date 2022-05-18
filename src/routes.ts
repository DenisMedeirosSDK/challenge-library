import { Router } from "express";
import { CreateAdminController } from "./controllers/create-admin-controller";
import { CreateBookController } from "./controllers/create-book-controller";
import { CreateLibraryController } from "./controllers/create-library-controller";
import { UpdateBookController } from "./controllers/update-book-controller";
import { VerifyAccountController } from "./controllers/verify-account.controller";

const createLibraryController = new CreateLibraryController();
const createBookController = new CreateBookController();
const updateBookController = new UpdateBookController();
const createAdminController = new CreateAdminController();
const verifyAccountController = new VerifyAccountController();

export const routes = Router();

routes.post("/library", createLibraryController.handle);
routes.post("/book", createBookController.handle);
routes.put("/book", updateBookController.handle);
routes.post("/admin", createAdminController.handle);
routes.get("/user/activate/:token", verifyAccountController.handle);

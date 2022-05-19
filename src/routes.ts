import { Router } from "express";
import { CreateAdminController } from "./controllers/create-admin-controller";
import { CreateBookController } from "./controllers/create-book-controller";
import { CreateLibraryController } from "./controllers/create-library-controller";
import { DeleteAdminController } from "./controllers/delete-admin-controller";
import { SendForgotPasswordController } from "./controllers/send-forgot-password-controller";
import { UpdateBookController } from "./controllers/update-book-controller";
import { VerifyAccountController } from "./controllers/verify-account.controller";

const createLibraryController = new CreateLibraryController();
const createBookController = new CreateBookController();
const updateBookController = new UpdateBookController();
const createAdminController = new CreateAdminController();
const verifyAccountController = new VerifyAccountController();
const deleteAdminController = new DeleteAdminController();
const sendForgotPasswordController = new SendForgotPasswordController();

export const routes = Router();

routes.post("/library", createLibraryController.handle);
routes.post("/book", createBookController.handle);
routes.put("/book", updateBookController.handle);
routes.post("/admin", createAdminController.handle);
routes.post("/send-forgot-password", sendForgotPasswordController.handle);
routes.delete("/library/admin/:libraryId", deleteAdminController.handle);
routes.get("/user/activate/:token", verifyAccountController.handle);

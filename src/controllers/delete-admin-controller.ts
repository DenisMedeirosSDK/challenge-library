import { Request, Response } from "express";
import Joi from "joi";
import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaAdminRepository } from "../repositories/prisma/prisma-admin-repository";
import { PrismaLibraryRepository } from "../repositories/prisma/prisma-library-repository";
import { DeleteLibraryAdminUseCase } from "../use-cases/delete-library-admin-use-case";

const schema = Joi.object({
  libraryId: Joi.string().required(),
});

export class DeleteAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { libraryId } = request.params;

    try {
      await schema.validateAsync({
        libraryId,
      });
    } catch (error) {
      throw new Error(`Invalid request: ${error}`);
    }

    const prismaLibraryRepository = new PrismaLibraryRepository();
    const deleteLibraryAdminUseCase = new DeleteLibraryAdminUseCase(
      prismaLibraryRepository
    );

    await deleteLibraryAdminUseCase.execute(libraryId);

    return response.status(200).end();
  }
}

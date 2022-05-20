import { Request, Response } from "express";
import Joi from "joi";
import { PrismaBookRepository } from "../repositories/prisma/prisma-book-repository";
import { PrismaLibraryRepository } from "../repositories/prisma/prisma-library-repository";
import { UpdateBookUseCase } from "../use-cases/update-book-use-case";

const schema = Joi.object({
  id: Joi.string().required(),
  edition: Joi.string().min(2).max(4),
  state: Joi.string().valid("NEW", "USED", "DAMAGED"),
  library: Joi.string(),
  libraryBookId: Joi.alternatives().conditional("library", {
    is: Joi.string().required(),
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
});

export class UpdateBookController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, edition, state, library, libraryBookId } = request.body;

    try {
      await schema.validateAsync({
        id,
        edition,
        state,
        library,
        libraryBookId,
      });
    } catch (error) {
      throw new Error(`Invalid request: ${error}`);
    }

    const prismaBookRepository = new PrismaBookRepository();
    const prismaLibraryRepository = new PrismaLibraryRepository();
    const updateBookUseCase = new UpdateBookUseCase(
      prismaBookRepository,
      prismaLibraryRepository
    );

    await updateBookUseCase.execute({
      id,
      edition,
      state,
      library,
      libraryBookId,
    });

    return response.end();
  }
}

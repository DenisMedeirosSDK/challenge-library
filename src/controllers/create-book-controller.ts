import { Request, Response } from "express";
import Joi from "joi";
import { PrismaBookRepository } from "../repositories/prisma/prisma-book-repository";
import { PrismaLibraryRepository } from "../repositories/prisma/prisma-library-repository";
import { CreateBookUseCase } from "../use-cases/create-book-use-case";

const schema = Joi.object({
  title: Joi.string().min(3).max(256).required(),
  edition: Joi.string().min(2).max(4).required(),
  year: Joi.number().required(),
  releaseDate: Joi.date().required(),
  state: Joi.string().valid("NEW", "USED", "DAMAGED").required(),
  libraryId: Joi.string().required(),
  inventory: Joi.number().positive().required(),
  street: Joi.string().min(3).max(256).required(),
  city: Joi.string().min(3).max(256).required(),
  stateAddress: Joi.string().min(2).max(2).required(),
  zip: Joi.string().required(),
  streetNumber: Joi.string(),
  complement: Joi.string().min(3).max(256).required(),
  latitude: Joi.string(),
  longitude: Joi.string(),
});

export class CreateBookController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      title,
      edition,
      year,
      releaseDate,
      state,
      libraryId,
      inventory,
      street,
      city,
      stateAddress,
      zip,
      streetNumber,
      complement,
      latitude,
      longitude,
    } = request.body;

    try {
      await schema.validateAsync({
        title,
        edition,
        year,
        releaseDate,
        state,
        libraryId,
        inventory,
        street,
        city,
        stateAddress,
        zip,
        streetNumber,
        complement,
        latitude,
        longitude,
      });
    } catch (error) {
      throw new Error(`Invalid request: ${error}`);
    }

    const prismaBookRepository = new PrismaBookRepository();
    const prismaLibraryRepository = new PrismaLibraryRepository();
    const createBookUseCase = new CreateBookUseCase(
      prismaBookRepository,
      prismaLibraryRepository
    );

    const book = {
      title,
      edition,
      year,
      releaseDate,
      state,
      libraryId,
      inventory,
      address: {
        street,
        city,
        state: stateAddress,
        zip,
        streetNumber,
        complement,
        latitude,
        longitude,
      },
    };

    await createBookUseCase.execute(book);

    return response.status(201).end();
  }
}

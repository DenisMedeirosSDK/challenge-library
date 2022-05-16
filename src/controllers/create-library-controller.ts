import { Request, Response } from "express";
import Joi from "joi";
import { Library } from "../dtos/library-dto";
import { PrismaLibraryRepository } from "../repositories/prisma/prisma-library-repository";
import { CreateLibraryUseCase } from "../use-cases/create-library-use-case";

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(256).required(),
  adminId: Joi.string(),
  street: Joi.string().alphanum().min(3).max(256).required(),
  city: Joi.string().alphanum().min(3).max(256).required(),
  state: Joi.string().min(2).max(2).required(),
  zip: Joi.string().alphanum().required(),
  streetNumber: Joi.string().alphanum(),
  complement: Joi.string().alphanum().min(3).max(256).required(),
  latitude: Joi.string().alphanum(),
  longitude: Joi.string().alphanum(),
});

export class CreateLibraryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      adminId,
      street,
      city,
      state,
      zip,
      streetNumber,
      complement,
      latitude,
      longitude,
    } = request.body;

    try {
      await schema.validateAsync({
        name,
        adminId,
        street,
        city,
        state,
        zip,
        streetNumber,
        complement,
        latitude,
        longitude,
      });
    } catch (error) {
      throw new Error(`Invalid request: ${error}`);
    }

    const prismaLibraryRepository = new PrismaLibraryRepository();
    const createLibraryUseCase = new CreateLibraryUseCase(
      prismaLibraryRepository
    );

    const library: Library = {
      name,
      adminId,
      address: {
        street,
        city,
        state,
        zip,
        streetNumber,
        complement,
        latitude,
        longitude,
      },
    };

    await createLibraryUseCase.execute(library);

    return response.status(201).end();
  }
}

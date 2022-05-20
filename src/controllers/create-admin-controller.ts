import { Request, Response } from "express";
import Joi from "joi";
import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaAdminRepository } from "../repositories/prisma/prisma-admin-repository";
import { PrismaLibraryRepository } from "../repositories/prisma/prisma-library-repository";
import { CreateAdminUseCase } from "../use-cases/create-admin-use-case";

const schema = Joi.object({
  name: Joi.string().min(3).max(128).required(),
  username: Joi.string().min(3).max(64).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required(),
  libraryId: Joi.string().required(),
});

export class CreateAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, libraryId } = request.body;

    try {
      await schema.validateAsync({
        name,
        username,
        email,
        password,
        libraryId,
      });
    } catch (error) {
      throw new Error(`Invalid request: ${error}`);
    }

    const prismaAdminRepository = new PrismaAdminRepository();
    const prismaLibraryRepository = new PrismaLibraryRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const createAdminUseCase = new CreateAdminUseCase(
      prismaAdminRepository,
      nodemailerMailAdapter,
      prismaLibraryRepository
    );

    await createAdminUseCase.execute({
      name,
      username,
      email,
      password,
      libraryId,
    });

    return response.status(201).end();
  }
}

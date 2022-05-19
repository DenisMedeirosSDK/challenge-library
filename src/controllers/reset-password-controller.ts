import { Request, Response } from "express";
import Joi from "joi";
import { PrismaAdminRepository } from "../repositories/prisma/prisma-admin-repository";
import { ResetPassswordUseCase } from "../use-cases/reset-password-use-case";

const schema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(8).max(32).required(),
});

export class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    try {
      await schema.validateAsync({
        token,
        password,
      });
    } catch (error) {
      throw new Error(`Invalid request: ${error}`);
    }

    const prismaAdminRepository = new PrismaAdminRepository();
    const resetPassswordUseCase = new ResetPassswordUseCase(
      prismaAdminRepository
    );

    await resetPassswordUseCase.execute({ token, password });

    return response.status(200).json({
      message: "Senha alterada com sucesso",
    });
  }
}

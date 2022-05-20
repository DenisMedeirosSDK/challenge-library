import { Request, Response } from "express";
import Joi from "joi";
import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaAdminRepository } from "../repositories/prisma/prisma-admin-repository";
import { SendForgotPasswordUseCase } from "../use-cases/send-forgot-password-use-case";

const schema = Joi.object({
  email: Joi.string().email().required(),
});

export class SendForgotPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    try {
      await schema.validateAsync({
        email,
      });
    } catch (error) {
      throw new Error(`Invalid request: ${error}`);
    }

    const prismaAdminRepository = new PrismaAdminRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const sendForgotPasswordUseCase = new SendForgotPasswordUseCase(
      prismaAdminRepository,
      nodemailerMailAdapter
    );

    await sendForgotPasswordUseCase.execute(email);

    return response.status(200).end();
  }
}

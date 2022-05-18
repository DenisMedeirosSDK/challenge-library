import { Request, Response } from "express";
import { PrismaAdminRepository } from "../repositories/prisma/prisma-admin-repository";
import { VerifyAccountUseCase } from "../use-cases/verify-account-use-case";

export class VerifyAccountController {
  async handle(request: Request, response: Response): Promise<void> {
    const { token } = request.params;

    const prismaAdminRepository = new PrismaAdminRepository();
    const verifyAccountUseCase = new VerifyAccountUseCase(
      prismaAdminRepository
    );

    await verifyAccountUseCase.execute(token);
    response.redirect("https://www.google.com");
  }
}

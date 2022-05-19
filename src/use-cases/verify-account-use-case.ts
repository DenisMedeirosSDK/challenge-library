import { verify } from "jsonwebtoken";
import { AdminRepository } from "../repositories/admin-repository";

export class VerifyAccountUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}
  async execute(token: string) {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const decoded = verify(token, JWT_SECRET) as {
      sub: string;
    };
    const userId = decoded.sub;
    const tokenActive = await this.adminRepository.findToken(token);
    if (!tokenActive) {
      throw new Error("Token not found");
    }

    const isActive = true;

    await this.adminRepository.update(userId, isActive);
  }
}

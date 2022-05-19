import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { AdminRepository } from "../repositories/admin-repository";

interface RequestResetPassword {
  token: string;
  password: string;
}

export class ResetPassswordUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute({ password, token }: RequestResetPassword) {
    const tokenExist = await this.adminRepository.findToken(token);
    if (!tokenExist) {
      throw new Error("Token not found");
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;

    const decoded = jsonwebtoken.verify(token, JWT_SECRET) as {
      sub: string;
    };

    const user = await this.adminRepository.findById(decoded.sub);
    if (!user) {
      throw new Error("User not found");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await this.adminRepository.updatePassword(user.id, passwordHash);
  }
}

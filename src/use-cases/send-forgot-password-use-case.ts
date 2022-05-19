import jsonwebtoken from "jsonwebtoken";
import path from "node:path";
import { MailAdapter } from "../adapters/mail-adapter";
import { AdminRepository } from "../repositories/admin-repository";

export class SendForgotPasswordUseCase {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly mailAdapter: MailAdapter
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.adminRepository.findByEmail(email);
    if (!user) {
      throw new Error("Email not found");
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;

    const token = jsonwebtoken.sign({}, JWT_SECRET, {
      subject: user.id,
      expiresIn: "1h",
    });

    await this.adminRepository.saveToken(token, user.id);

    let variables = {
      email: user.email,
      token: token,
      url: `${process.env.FRONTEND_URL}/reset-password/${token}`,
    };

    const templatePath = path.resolve(
      __dirname,
      "..",
      "templates",
      "emails",
      "send-forgot-password.hbs"
    );

    await this.mailAdapter.sendMail({
      from: "<equipe@naoresponder.com>",
      to: user.email,
      subject: "Reset Password <Equipe>",
      path: templatePath,
      variables,
    });
  }
}

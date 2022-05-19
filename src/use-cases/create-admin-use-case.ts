import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import path from "node:path";
import { MailAdapter } from "../adapters/mail-adapter";
import { Admin } from "../dtos/admin-dto";
import { AdminRepository } from "../repositories/admin-repository";
import { LibraryRepository } from "../repositories/library-repository";

export interface RequestAdmin {
  name: string;
  username: string;
  email: string;
  password: string;
  libraryId: string;
}

export class CreateAdminUseCase {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly mailAdapter: MailAdapter,
    private readonly libraryRepository: LibraryRepository
  ) {}
  async execute({ name, username, email, password, libraryId }: RequestAdmin) {
    const usernameExists = await this.adminRepository.findByUsername(username);
    if (usernameExists) {
      throw new Error("Username already exists");
    }

    const emailExists = await this.adminRepository.findByEmail(email);
    if (emailExists) {
      throw new Error("Email already exists");
    }

    const libraryIdExist = await this.libraryRepository.findById(libraryId);
    if (!libraryIdExist) {
      throw new Error("LibraryId does not exist");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    if (!name || !username || !email || !password || !libraryId) {
      throw new Error("Missing fields");
    }

    const user: Admin = await this.adminRepository.create({
      name,
      username,
      email,
      isAdmin: true,
      isActive: false,
      password: passwordHash,
    });

    if (user === undefined) {
      return;
    }

    await this.libraryRepository.updateAdmin(libraryId, user.id);

    const JWT_SECRET = process.env.JWT_SECRET as string;

    const token = jsonwebtoken.sign({}, JWT_SECRET, {
      subject: user.id,
    });

    await this.adminRepository.saveToken(token, user.id);

    let variables = {
      user: {
        name,
      },
      url: `${process.env.API_URL}/user/activate/${token}`,
    };

    const templatePath = path.resolve(
      __dirname,
      "..",
      "templates",
      "emails",
      "wellcome-new-user.hbs"
    );

    await this.mailAdapter.sendMail({
      subject: "Welcome to the app",
      from: "<equipe@naoresponder.com>",
      to: email,
      variables,
      path: templatePath,
    });
  }
}

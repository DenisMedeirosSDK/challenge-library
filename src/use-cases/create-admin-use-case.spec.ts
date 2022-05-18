import bcrypt from "bcrypt";
import { createAdmin } from "../dtos/admin-dto";
import { CreateAdminUseCase } from "./create-admin-use-case";

const create = jest.fn();
const findByEmail = jest.fn();
const findByUsername = jest.fn();
const sendMail = jest.fn();
const saveToken = jest.fn();
const findToken = jest.fn();
const update = jest.fn();

const libraryCreate = jest.fn();
const libraryFindById = jest.fn();
const libraryFindByName = jest.fn();
const libraryUpdateAdmin = jest.fn();

const createAdminUseCase = new CreateAdminUseCase(
  {
    create,
    findByEmail,
    findByUsername,
    saveToken,
    findToken,
    update,
  },
  {
    sendMail,
  },
  {
    create: libraryCreate,
    findById: libraryFindById,
    findByName: libraryFindByName,
    updateAdmin: libraryUpdateAdmin,
  }
);

describe("Create Admin Use Case", () => {
  it("should be defined", () => {
    expect(CreateAdminUseCase).toBeDefined();
  });
  it("should be able create new admin", async () => {
    const hashSpy = jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(() => Promise.resolve("Test"));

    const RequestAdmin = {
      name: "Test",
      username: "Test",
      email: "Test",
      password: "Test",
      isAdmin: true,
      isActive: false,
      libraryId: "Test",
    };
    const admin = {
      name: "Test",
      username: "Test",
      email: "Test",
      password: "Test",
      isAdmin: true,
      isActive: false,
    };

    findByUsername.mockResolvedValue(false);
    findByEmail.mockResolvedValue(false);
    saveToken.mockResolvedValue(false);
    libraryFindById.mockResolvedValue(true);

    await createAdminUseCase.execute(RequestAdmin);

    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(create).toHaveBeenCalledWith(admin);
  });
  it("should throw error when email already exists", async () => {
    const admin = {
      name: "Test",
      username: "Test",
      email: "Test",
      password: "Test",
      isAdmin: true,
      isActive: false,
      libraryId: "Test",
    };

    findByEmail.mockResolvedValue(true);

    await expect(createAdminUseCase.execute(admin)).rejects.toEqual(
      new Error("Email already exists")
    );
  });
  it("should throw error when username already exists", async () => {
    const admin = {
      name: "Test",
      username: "Test",
      email: "Test",
      password: "Test",
      isAdmin: true,
      isActive: false,
      libraryId: "Test",
    };

    findByUsername.mockResolvedValue(true);
    findByEmail.mockResolvedValue(false);

    await expect(createAdminUseCase.execute(admin)).rejects.toEqual(
      new Error("Username already exists")
    );
  });
  it("should throw error when name is not provided", async () => {
    const admin = {
      name: "",
      username: "",
      email: "",
      password: "",
      isAdmin: true,
      isActive: false,
      libraryId: "Test",
    };

    findByUsername.mockResolvedValue(false);
    findByEmail.mockResolvedValue(false);

    await expect(createAdminUseCase.execute(admin)).rejects.toEqual(
      new Error("Missing fields")
    );
  });

  it("should throw error when LIBRARY non exists", async () => {
    const admin = {
      name: "Test",
      username: "Test",
      email: "Test",
      password: "Test",
      isAdmin: true,
      isActive: false,
      libraryId: "Test",
    };

    findByUsername.mockResolvedValue(false);
    findByEmail.mockResolvedValue(false);
    libraryFindById.mockResolvedValue(null);

    await expect(createAdminUseCase.execute(admin)).rejects.toEqual(
      new Error("LibraryId does not exist")
    );
  });
});

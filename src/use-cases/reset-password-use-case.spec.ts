import jsonwebtoken from "jsonwebtoken";
import { ResetPassswordUseCase } from "./reset-password-use-case";
const create = jest.fn();
const findByEmail = jest.fn();
const findByUsername = jest.fn();
const findToken = jest.fn();
const saveToken = jest.fn();
const update = jest.fn();
const findById = jest.fn();
const updatePassword = jest.fn();

const resetPassswordUseCase = new ResetPassswordUseCase({
  create,
  findByEmail,
  findByUsername,
  findToken,
  saveToken,
  update,
  findById,
  updatePassword,
});

describe("ResetPasswordUseCase", () => {
  it("should be defined", () => {
    expect(resetPassswordUseCase).toBeDefined();
  });
  it("should be able to reset password", async () => {
    const jsonwebtokenSpy = jest
      .spyOn(jsonwebtoken, "verify")
      .mockImplementation(() => Promise.resolve({ verified: "true" }));

    const password = "password";
    const token = "token";

    findToken.mockResolvedValue(true);
    updatePassword.mockResolvedValue(true);
    findById.mockResolvedValue(true);

    await resetPassswordUseCase.execute({
      password,
      token,
    });

    expect(findToken).toHaveBeenCalledWith(token);
    expect(jsonwebtokenSpy).toHaveBeenCalledTimes(1);
    expect(updatePassword).toHaveBeenCalledTimes(1);
  });
  it("should throw error when token does not exists", async () => {
    const token = "token";
    const password = "password";

    findToken.mockResolvedValue(false);

    await expect(
      resetPassswordUseCase.execute({ password, token })
    ).rejects.toThrow("Token not found");
  });
  it("", async () => {
    const token = "token";
    const password = "password";

    findToken.mockResolvedValue(true);
    findById.mockResolvedValue(false);

    await expect(
      resetPassswordUseCase.execute({ password, token })
    ).rejects.toThrow("User not found");
  });
});

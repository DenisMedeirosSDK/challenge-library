import jsonwebtoken from "jsonwebtoken";
import { VerifyAccountUseCase } from "./verify-account-use-case";

const create = jest.fn();
const findByEmail = jest.fn();
const findByUsername = jest.fn();
const saveToken = jest.fn();
const findToken = jest.fn();
const update = jest.fn();
const findById = jest.fn();
const updatePassword = jest.fn();

const verifyAccountUseCase = new VerifyAccountUseCase({
  create,
  findByEmail,
  findByUsername,
  saveToken,
  findToken,
  update,
  findById,
  updatePassword,
});

describe("Verify Account Use Case", () => {
  it("should be defined", () => {
    expect(VerifyAccountUseCase).toBeDefined();
  });
  it("should be able to verify account", async () => {
    const jsonwebtokenSpy = jest
      .spyOn(jsonwebtoken, "verify")
      .mockImplementation(() => Promise.resolve({ verified: "true" }));

    const token = "Test";
    const decoded = {
      sub: "Test",
    };

    findToken.mockResolvedValue(true);
    await verifyAccountUseCase.execute(token);

    expect(jsonwebtokenSpy).toHaveBeenCalledTimes(1);
    expect(findToken).toHaveBeenCalledWith(token);
  });
  it("should throw error when token not found", async () => {
    const token = "Test";

    findToken.mockResolvedValue(false);
    await expect(verifyAccountUseCase.execute(token)).rejects.toThrow(
      "Token not found"
    );
  });
});

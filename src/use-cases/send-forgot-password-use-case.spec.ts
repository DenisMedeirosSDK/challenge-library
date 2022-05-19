import jsonwebtoken from "jsonwebtoken";
import { SendForgotPasswordUseCase } from "./send-forgot-password-use-case";

const create = jest.fn();
const findByEmail = jest.fn();
const findByUsername = jest.fn();
const findToken = jest.fn();
const saveToken = jest.fn();
const update = jest.fn();
const findById = jest.fn();
const updatePassword = jest.fn();

const sendMail = jest.fn();

const sendForgotPasswordUseCase = new SendForgotPasswordUseCase(
  {
    create,
    findByEmail,
    findByUsername,
    findToken,
    saveToken,
    update,
    findById,
    updatePassword,
  },
  {
    sendMail,
  }
);

describe("SendForgotPasswordUseCase", () => {
  it("should be defined", () => {
    expect(sendForgotPasswordUseCase).toBeDefined();
  });
  it("should be able to send forgot password email", async () => {
    const jsonwebtokenSpy = jest
      .spyOn(jsonwebtoken, "sign")
      .mockImplementation(() => Promise.resolve("token"));
    const email = "email@mail.com";

    findByEmail.mockResolvedValue(email);
    saveToken.mockResolvedValue(true);
    sendMail.mockResolvedValue(true);

    await sendForgotPasswordUseCase.execute(email);

    expect(findByEmail).toHaveBeenCalledWith(email);
    expect(jsonwebtokenSpy).toHaveBeenCalledTimes(1);
    expect(saveToken).toHaveBeenCalledTimes(1);
    expect(sendMail).toHaveBeenCalledTimes(1);
  });
  it("should be able to send forgot password", async () => {
    const email = "not@found.com";

    findByEmail.mockResolvedValue(null);

    await expect(sendForgotPasswordUseCase.execute(email)).rejects.toEqual(
      new Error("Email not found")
    );
  });
});

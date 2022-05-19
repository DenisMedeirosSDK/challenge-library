import { DeleteLibraryAdminUseCase } from "./delete-library-admin-use-case";
const create = jest.fn();
const findByName = jest.fn();
const findById = jest.fn();
const updateAdmin = jest.fn();
const deleteAdmin = jest.fn();

const deleteLibraryAdminUseCase = new DeleteLibraryAdminUseCase({
  create,
  deleteAdmin,
  findById,
  findByName,
  updateAdmin,
});

describe("DeleteLibraryAdminUseCase", () => {
  it("should be defined", () => {
    expect(deleteLibraryAdminUseCase).toBeDefined();
  });
  it("should be able delete admin of library", async () => {
    const id = "1";

    findById.mockResolvedValue({ id });
    deleteAdmin.mockResolvedValue(true);

    await deleteLibraryAdminUseCase.execute(id);

    expect(findById).toHaveBeenCalledWith(id);
    expect(deleteAdmin).toHaveBeenCalledWith(id);
  });
  it("should throw error when Id is not provided", async () => {
    const id = "";

    await expect(deleteLibraryAdminUseCase.execute(id)).rejects.toEqual(
      new Error("id is required")
    );
  });
  it("should throw error when library does not exists", async () => {
    const id = "1";

    findById.mockResolvedValue(null);

    await expect(deleteLibraryAdminUseCase.execute(id)).rejects.toEqual(
      new Error("Library does not exists")
    );
  });
});

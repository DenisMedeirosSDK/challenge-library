import { BookState } from "../dtos/book-dto";
import { UpdateBookUseCase } from "./update-book-use-case";

const create = jest.fn();
const findByTitle = jest.fn();
const update = jest.fn();
const findById = jest.fn();
const findLibraryBookId = jest.fn();

const findLibraryById = jest.fn();
const findLibraryByName = jest.fn();
const createLibrary = jest.fn();
const updateAdminLibrary = jest.fn();
const deleteAdminLibrary = jest.fn();

const updateBookUseCase = new UpdateBookUseCase(
  {
    create,
    findByTitle,
    update,
    findById,
    findLibraryBookId,
  },
  {
    findById: findLibraryById,
    create: createLibrary,
    findByName: findLibraryByName,
    updateAdmin: updateAdminLibrary,
    deleteAdmin: deleteAdminLibrary,
  }
);

describe("UpdateBookUseCase", () => {
  it("should be defined", () => {
    expect(UpdateBookUseCase).toBeDefined();
  });
  it("should call update method", async () => {
    const id = "6a54sd5a";
    const edition = "edition";
    const state: BookState = BookState.USED;
    const library = "library";
    const libraryBookId = "libraryBookId";

    findById.mockResolvedValue(true);
    findLibraryById.mockResolvedValue(true);
    findLibraryBookId.mockResolvedValue(true);

    await updateBookUseCase.execute({
      id,
      edition,
      state,
      library,
      libraryBookId,
    });
    expect(update).toHaveBeenCalledWith(
      id,
      edition,
      state,
      library,
      libraryBookId
    );
  });

  it("should throw error when Id is not provided", async () => {
    const id = "";
    const edition = "edition";
    const state: BookState = BookState.USED;
    const library = "library";
    const libraryBookId = "libraryBookId";

    await expect(
      updateBookUseCase.execute({ id, edition, state, library, libraryBookId })
    ).rejects.toThrow("Id is required");
  });
  it("should throw error when book does not exists", async () => {
    const id = "6a54sd5a";
    const edition = "edition";
    const state: BookState = BookState.USED;
    const library = "library";
    const libraryBookId = "libraryBookId";

    findById.mockResolvedValue(false);

    await expect(
      updateBookUseCase.execute({ id, edition, state, library, libraryBookId })
    ).rejects.toThrow("Book not found");
  });

  it("should throw error when library does not exists", async () => {
    const id = "6a54sd5a";
    const edition = "edition";
    const state: BookState = BookState.USED;
    const library = "library";
    const libraryBookId = "libraryBookId";

    findById.mockResolvedValue(true);
    findLibraryById.mockResolvedValue(false);

    await expect(
      updateBookUseCase.execute({ id, edition, state, library, libraryBookId })
    ).rejects.toThrow("Library not found");
  });
  it("should throw error when librarybook does not exists", async () => {
    const id = "6a54sd5a";
    const edition = "edition";
    const state: BookState = BookState.USED;
    const library = "library";
    const libraryBookId = "libraryBookId";

    findById.mockResolvedValue(true);
    findLibraryById.mockResolvedValue(true);
    findLibraryBookId.mockResolvedValue(false);

    await expect(
      updateBookUseCase.execute({ id, edition, state, library, libraryBookId })
    ).rejects.toThrow("LibraryBook not found");
  });

  it("should throw error when parameter is not provided", async () => {
    findById.mockReturnValue(true);

    await expect(updateBookUseCase.execute({ id: "6a54sd5a" })).rejects.toEqual(
      new Error("No update parameters were provided")
    );
  });
});

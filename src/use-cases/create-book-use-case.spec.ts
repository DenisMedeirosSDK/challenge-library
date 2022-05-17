import { BookState, CreateBook } from "../dtos/book-dto";
import { CreateBookUseCase } from "./create-book-use-case";

const create = jest.fn();
const findByTitle = jest.fn();
const findLibraryById = jest.fn();
const findLibraryByName = jest.fn();

const createLibrary = jest.fn();

const createBookUseCase = new CreateBookUseCase(
  { create, findByTitle },
  {
    findById: findLibraryById,
    create: createLibrary,
    findByName: findLibraryByName,
  }
);

describe("Create Book Use Case", () => {
  it("should be defined", () => {
    expect(CreateBookUseCase).toBeDefined();
  });
  it("should be able create new book", async () => {
    const book: CreateBook = {
      title: "Test",
      edition: "Test",
      year: 2020,
      releaseDate: new Date(Date.now()),
      state: BookState.NEW,
      libraryId: "Test",
      inventory: 1,
      address: {
        street: "street",
        city: "city",
        state: "state",
        zip: "zip",
        streetNumber: "streetNumber",
        complement: "complement",
        latitude: "latitude",
        longitude: "longitude",
      },
    };

    findLibraryById.mockResolvedValue(true);

    await createBookUseCase.execute(book);
    expect(create).toHaveBeenCalledWith(book);
  });
  it("should throw error when title is not provided", async () => {
    const book: CreateBook = {
      title: "",
      edition: "Test",
      year: 2020,
      releaseDate: new Date(Date.now()),
      state: BookState.NEW,
      libraryId: "Test",
      inventory: 1,
      address: {
        street: "street",
        city: "city",
        state: "state",
        zip: "zip",
        streetNumber: "streetNumber",
        complement: "complement",
        latitude: "latitude",
        longitude: "longitude",
      },
    };

    await expect(createBookUseCase.execute(book)).rejects.toEqual(
      new Error("Title is required")
    );
  });
  it("should throw error when book already exists", async () => {
    const book: CreateBook = {
      title: "Test",
      edition: "Test",
      year: 2020,
      releaseDate: new Date(Date.now()),
      state: BookState.NEW,
      libraryId: "Test",
      inventory: 1,
      address: {
        street: "street",
        city: "city",
        state: "state",
        zip: "zip",
        streetNumber: "streetNumber",
        complement: "complement",
        latitude: "latitude",
        longitude: "longitude",
      },
    };

    findByTitle.mockResolvedValue(true);

    await expect(createBookUseCase.execute(book)).rejects.toEqual(
      new Error("Book already exists")
    );
  });
  it("should throw error when inventory is not greater or equal than 0", async () => {
    const book: CreateBook = {
      title: "Test 2",
      edition: "Test",
      year: 2020,
      releaseDate: new Date(Date.now()),
      state: BookState.NEW,
      libraryId: "Test",
      inventory: -1,
      address: {
        street: "street",
        city: "city",
        state: "state",
        zip: "zip",
        streetNumber: "streetNumber",
        complement: "complement",
        latitude: "latitude",
        longitude: "longitude",
      },
    };

    findByTitle.mockResolvedValue(false);

    await expect(createBookUseCase.execute(book)).rejects.toEqual(
      new Error("Inventory must be greater or equal than 0")
    );
  });
  it("should throw error when libraryId is not provided", async () => {
    const book: CreateBook = {
      title: "Test",
      edition: "Test",
      year: 2020,
      releaseDate: new Date(Date.now()),
      state: BookState.NEW,
      libraryId: "",
      inventory: 1,
      address: {
        street: "street",
        city: "city",
        state: "state",
        zip: "zip",
        streetNumber: "streetNumber",
        complement: "complement",
        latitude: "latitude",
        longitude: "longitude",
      },
    };

    await expect(createBookUseCase.execute(book)).rejects.toEqual(
      new Error("Library is required")
    );
  });

  it("should throw error when library does not exists", async () => {
    const book: CreateBook = {
      title: "Test 3",
      edition: "Test",
      year: 2020,
      releaseDate: new Date(Date.now()),
      state: BookState.NEW,
      libraryId: "Test",
      inventory: 1,
      address: {
        street: "street",
        city: "city",
        state: "state",
        zip: "zip",
        streetNumber: "streetNumber",
        complement: "complement",
        latitude: "latitude",
        longitude: "longitude",
      },
    };

    findByTitle.mockResolvedValue(false);
    findLibraryById.mockResolvedValue(null);

    await expect(createBookUseCase.execute(book)).rejects.toEqual(
      new Error("Library does not exists")
    );
  });
});

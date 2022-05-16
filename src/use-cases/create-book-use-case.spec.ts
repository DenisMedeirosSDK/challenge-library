import { BookStatus, CreateBook } from "../dtos/book-dto";
import { CreateBookUseCase } from "./create-book-use-case";

const create = jest.fn();
const findByTitle = jest.fn();

const createBookUseCase = new CreateBookUseCase({ create, findByTitle });

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
      status: BookStatus.NEW,
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

    await createBookUseCase.execute(book);
    expect(create).toHaveBeenCalledWith(book);
  });
  it("should throw error when title is not provided", async () => {
    const book: CreateBook = {
      title: "",
      edition: "Test",
      year: 2020,
      releaseDate: new Date(Date.now()),
      status: BookStatus.NEW,
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
      status: BookStatus.NEW,
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
      status: BookStatus.NEW,
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
});

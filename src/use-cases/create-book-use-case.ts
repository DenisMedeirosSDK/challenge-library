import { CreateBook } from "../dtos/book-dto";
import { BookRepository } from "../repositories/book-repository";
import { LibraryRepository } from "../repositories/library-repository";

export class CreateBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly libraryRepository: LibraryRepository
  ) {}
  async execute(book: CreateBook) {
    if (!book.title) {
      throw new Error("Title is required");
    }

    const bookByTitle = await this.bookRepository.findByTitle(book.title);
    if (bookByTitle) {
      throw new Error("Book already exists");
    }

    if (book.inventory < 0) {
      throw new Error("Inventory must be greater or equal than 0");
    }

    if (!book.libraryId) {
      throw new Error("Library is required");
    }

    const library = await this.libraryRepository.findById(book.libraryId);
    if (!library) {
      throw new Error("Library does not exists");
    }

    await this.bookRepository.create(book);
  }
}

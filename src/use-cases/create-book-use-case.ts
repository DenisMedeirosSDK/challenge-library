import { CreateBook } from "../dtos/book-dto";
import { BookRepository } from "../repositories/book-repository";

export class CreateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}
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

    await this.bookRepository.create(book);
  }
}

import { CreateBook, ListBook } from "../dtos/book-dto";

export interface BookRepository {
  create(book: CreateBook): Promise<void>;
  findByTitle(title: string): Promise<ListBook | null | undefined>;
}

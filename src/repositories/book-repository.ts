import { BookState, CreateBook, LibraryBook, ListBook } from "../dtos/book-dto";

export interface BookRepository {
  create(book: CreateBook): Promise<void>;
  findByTitle(title: string): Promise<ListBook | null | undefined>;
  update(
    id: string,
    edition?: string,
    state?: BookState,
    library?: string,
    libraryBookId?: string
  ): Promise<void>;
  findById(id: string): Promise<ListBook | null | undefined>;
  findLibraryBookId(
    libraryBookId: string
  ): Promise<LibraryBook | null | undefined>;
}

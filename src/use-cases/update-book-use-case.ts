import { BookState } from "../dtos/book-dto";
import { BookRepository } from "../repositories/book-repository";
import { LibraryRepository } from "../repositories/library-repository";

interface RequestBookUpdate {
  id: string;
  edition?: string;
  state?: BookState;
  library?: string;
  libraryBookId?: string;
}

export class UpdateBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly libraryRepository: LibraryRepository
  ) {}

  async execute({
    id,
    edition,
    state,
    library,
    libraryBookId,
  }: RequestBookUpdate): Promise<void> {
    if (!id) {
      throw new Error("Id is required");
    }

    const bookExist = await this.bookRepository.findById(id);
    if (!bookExist) {
      throw new Error("Book not found");
    }

    if (library && libraryBookId) {
      const libraryExist = await this.libraryRepository.findById(library);
      if (!libraryExist) {
        throw new Error("Library not found");
      }

      const libraryBookExist = await this.bookRepository.findLibraryBookId(
        libraryBookId
      );
      if (!libraryBookExist) {
        throw new Error("LibraryBook not found");
      }
    }

    if (!edition && !state && !library && !libraryBookId) {
      throw new Error("No update parameters were provided");
    }

    await this.bookRepository.update(
      id,
      edition,
      state,
      library,
      libraryBookId
    );
  }
}

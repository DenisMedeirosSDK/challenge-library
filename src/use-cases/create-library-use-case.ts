import { Library } from "../dtos/library-dto";
import { LibraryRepository } from "../repositories/library-repository";

export class CreateLibraryUseCase {
  constructor(private readonly libraryRepository: LibraryRepository) {}

  async execute(library: Library): Promise<void> {
    if (!library.name) {
      throw new Error("Name is required");
    }

    const libraryByName = await this.libraryRepository.findByName(library.name);
    if (libraryByName) {
      throw new Error("Library already exists");
    }

    await this.libraryRepository.create(library);
  }
}

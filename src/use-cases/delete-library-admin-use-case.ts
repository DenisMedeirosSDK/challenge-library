import { LibraryRepository } from "../repositories/library-repository";

export class DeleteLibraryAdminUseCase {
  constructor(private readonly libraryRepository: LibraryRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error("id is required");
    }

    const library = await this.libraryRepository.findById(id);
    if (!library) {
      throw new Error("Library does not exists");
    }

    await this.libraryRepository.deleteAdmin(id);
  }
}

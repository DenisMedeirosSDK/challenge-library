import { Library } from "../dtos/library-dto";

export interface LibraryRepository {
  create(library: Library): Promise<void>;
  findByName(name: string): Promise<Library | null | undefined>;
  findById(id: string): Promise<Library | null | undefined>;
  updateAdmin(id: string, adminId: string): Promise<void>;
}

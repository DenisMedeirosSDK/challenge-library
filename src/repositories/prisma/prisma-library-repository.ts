import { Library } from "../../dtos/library-dto";
import { prisma } from "../../libs/prisma";
import { LibraryRepository } from "../../repositories/library-repository";

export class PrismaLibraryRepository implements LibraryRepository {
  async updateAdmin(id: string, adminId: string): Promise<void> {
    await prisma.library.update({
      where: {
        id,
      },
      data: {
        adminId,
      },
    });
  }
  async findById(id: string): Promise<Library | null | undefined> {
    return prisma.library.findFirst({
      where: {
        id: id,
      },
    });
  }
  async create(library: Library): Promise<void> {
    await prisma.library.create({
      data: {
        name: library.name,
        adminId: library.adminId,
        address: {
          create: {
            street: library.address?.street as string,
            city: library?.address?.city as string,
            state: library?.address?.state as string,
            zip: library?.address?.zip as string,
            streetNumber: library?.address?.streetNumber as string,
            complement: library?.address?.complement as string,
            latitude: library?.address?.latitude,
            longitude: library?.address?.longitude,
          },
        },
      },
    });
  }
  async findByName(name: string): Promise<Library | null | undefined> {
    return prisma.library.findFirst({
      where: {
        name,
      },
    });
  }
}

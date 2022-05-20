import {
  BookState,
  CreateBook,
  LibraryBook,
  ListBook,
} from "../../dtos/book-dto";
import { prisma } from "../../libs/prisma";
import { BookRepository } from "../../repositories/book-repository";

export class PrismaBookRepository implements BookRepository {
  async findLibraryBookId(
    libraryBookId: string
  ): Promise<LibraryBook | null | undefined> {
    return prisma.libraryBook.findFirst({
      where: {
        id: libraryBookId,
      },
      select: {
        id: true,
        libraryId: true,
        bookId: true,
      },
    });
  }
  async update(
    id: string,
    edition?: string,
    state?: BookState,
    library?: string,
    libraryBookId?: string
  ): Promise<void> {
    if (libraryBookId && library) {
      await prisma.book.update({
        where: {
          id,
        },
        data: {
          edition,
          state,
          LibraryBook: {
            update: {
              data: {
                libraryId: library,
              },
              where: {
                id: libraryBookId,
              },
            },
          },
        },
      });
    }
    await prisma.book.update({
      where: {
        id,
      },
      data: {
        edition,
        state,
      },
    });
  }
  async findById(id: string): Promise<ListBook | null | undefined> {
    return prisma.book.findFirst({
      where: {
        id,
      },
    });
  }
  async create(book: CreateBook): Promise<void> {
    await prisma.book.create({
      data: {
        title: book.title,
        edition: book.edition,
        year: book.year,
        releaseDate: book.releaseDate,
        state: book.state,
        inventory: book.inventory,
        address: {
          create: {
            street: book.address?.street as string,
            city: book.address?.city as string,
            state: book.address?.state as string,
            zip: book.address?.zip as string,
            streetNumber: book.address?.streetNumber as string,
            complement: book.address?.complement as string,
            latitude: book.address?.latitude,
            longitude: book.address?.longitude,
          },
        },
        LibraryBook: {
          create: {
            library: {
              connect: {
                id: book.libraryId,
              },
            },
          },
        },
      },
    });
  }
  async findByTitle(title: string): Promise<ListBook | null | undefined> {
    return prisma.book.findFirst({
      where: {
        title,
      },
    });
  }
}

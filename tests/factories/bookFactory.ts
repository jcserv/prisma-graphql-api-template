import { PrismaClient, book, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { AuthorFactory, CreateAuthorInput } from "./authorFactory";

export type CreateBookInput = Omit<Prisma.bookCreateInput, "author">;

export class BookFactory {
  constructor(private prisma: PrismaClient) {}

  static getDefaults(): Omit<CreateBookInput, "author"> {
    return {
      title: faker.commerce.productName(),
    };
  }

  async create(
    authorId: number,
    input: Partial<Omit<CreateBookInput, "author">> = {}
  ): Promise<book> {
    const data: Prisma.bookCreateInput = {
      ...BookFactory.getDefaults(),
      ...input,
      author: {
        connect: { id: authorId },
      },
    };

    return this.prisma.book.create({
      data,
    });
  }

  async createMany(
    authorId: number,
    input: Partial<Omit<CreateBookInput, "author">>[] = []
  ): Promise<book[]> {
    const books = [];
    for (let i = 0; i < input.length; i++) {
      books.push(await this.create(authorId, input[i]));
    }
    return books;
  }

  async createWithAuthor(
    bookInput: Partial<Omit<CreateBookInput, "author">> = {},
    authorInput: Partial<Omit<CreateAuthorInput, "book">> = {}
  ): Promise<book> {
    const author = await this.prisma.author.create({
      data: {
        ...AuthorFactory.getDefaults(),
        ...authorInput,
      },
      include: {
        book: false,
      },
    });

    const data: Prisma.bookCreateInput = {
      ...BookFactory.getDefaults(),
      ...bookInput,
      author: {
        connect: { id: author.id },
      },
    };

    return this.prisma.book.create({
      data,
      include: {
        author: true,
      },
    });
  }
}

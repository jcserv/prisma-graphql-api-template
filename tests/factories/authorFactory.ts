import { PrismaClient, author, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { BookFactory, CreateBookInput } from "@tests/factories";

export type CreateAuthorInput = Prisma.authorCreateInput;

export class AuthorFactory {
  constructor(private prisma: PrismaClient) {}

  static getDefaults(): Omit<CreateAuthorInput, "book"> {
    return {
      name: faker.person.fullName(),
    };
  }

  async create(input: Partial<CreateAuthorInput> = {}): Promise<author> {
    const data: CreateAuthorInput = {
      ...AuthorFactory.getDefaults(),
      ...input,
    };

    return this.prisma.author.create({
      data,
    });
  }

  async createMany(
    input: Partial<CreateAuthorInput>[] = []
  ): Promise<author[]> {
    const authors = [];
    for (let i = 0; i < input.length; i++) {
      authors.push(await this.create(input[i]));
    }
    return authors;
  }

  async createWithBooks(
    authorInput: Partial<Omit<CreateAuthorInput, "book">> = {},
    bookInputs: Partial<CreateBookInput>[] = []
  ): Promise<author> {
    const defaultBookInputs = Array(bookInputs.length)
      .fill(null)
      .map((_, index) => bookInputs[index] || {});

    const data: CreateAuthorInput = {
      ...AuthorFactory.getDefaults(),
      ...authorInput,
      book: {
        create: defaultBookInputs.map((bookInput) => ({
          ...BookFactory.getDefaults(),
          ...bookInput,
        })),
      },
    };

    return this.prisma.author.create({
      data,
      include: {
        book: true,
      },
    });
  }
}
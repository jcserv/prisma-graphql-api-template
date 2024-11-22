import { prisma } from "@/db";
import { BookFactory } from "@tests/factories";
import {
  TestContext,
  cleanupDatabase,
  expectRelayConnection,
} from "@tests/utils";
import gql from "graphql-tag";

interface GetBooksResponse {
  books: {
    edges: Array<{
      node: {
        bookId: number;
        title: string;
      };
    }>;
  };
}

const GET_BOOKS = gql`
  query GetBooks($bookId: Int!) {
    books(bookId: $bookId) {
      edges {
        node {
          bookId
          title
        }
      }
    }
  }
`;

describe("When querying books endpoint", () => {
  let ctx: TestContext;

  beforeEach(async () => {
    ctx = await TestContext.create();
  });

  afterEach(async () => {
    await cleanupDatabase(prisma);
    await prisma.$disconnect();
  });

  it("should return book", async () => {
    const bookFactory = new BookFactory(prisma);
    const book = await bookFactory.createWithAuthor(
      {
        title: "The Martian",
      },
      {
        name: "Andy Weir",
      },
    );

    const response = await ctx.query<GetBooksResponse>(GET_BOOKS, {
      bookId: book.id,
    });

    expect(response.success).toBe(true);
    expectRelayConnection(response.data?.books, [
      {
        bookId: book.id.toString(),
        title: "The Martian",
      },
    ]);
  });
});

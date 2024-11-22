import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { gql } from "graphql-tag";

import { prisma } from "@/db";
import { AuthorFactory } from "@tests/factories";
import {
  cleanupDatabase,
  expectRelayConnection,
  TestContext,
} from "@tests/utils";

interface GetAuthorsResponse {
  authors: {
    edges: Array<{
      node: {
        authorId: number;
        name: string;
        books: {
          edges: Array<{
            node: {
              bookId: number;
              title: string;
            };
          }>;
        };
      };
    }>;
  };
}

const GET_AUTHORS = gql`
  query GetAuthors($authorId: Int!) {
    authors(authorId: $authorId) {
      edges {
        node {
          authorId
          name
          books {
            edges {
              node {
                bookId
                title
              }
            }
          }
        }
      }
    }
  }
`;

describe("When querying authors endpoint", () => {
  let ctx: TestContext;

  beforeEach(async () => {
    ctx = await TestContext.create();
  });

  afterEach(async () => {
    await cleanupDatabase(prisma);
    await prisma.$disconnect();
  });

  it("should return author with books", async () => {
    const authorFactory = new AuthorFactory(prisma);
    const author = await authorFactory.createWithBooks(
      {
        name: "Andy Weir",
      },
      [{ title: "The Martian" }, { title: "Project Hail Mary" }],
    );

    const response = await ctx.query<GetAuthorsResponse>(GET_AUTHORS, {
      authorId: author.id,
    });

    expect(response.success).toBe(true);
    expectRelayConnection(response.data?.authors, [
      {
        authorId: author.id.toString(),
        name: "Andy Weir",
        books: [
          {
            title: "The Martian",
          },
          {
            title: "Project Hail Mary",
          },
        ],
      },
    ]);
  });

  it("should handle GraphQL errors", async () => {
    const response = await ctx.query(gql`
      query InvalidQuery {
        invalidField
      }
    `);

    expect(response.success).toBe(false);
    expect(response.errors).toBeDefined();
  });
});

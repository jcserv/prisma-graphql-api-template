import { prisma } from "@/db";
import { builder, QueryFieldBuilder } from "@/graphql/builder";
import { BookNode } from "@/graphql/nodes/book";
import { compare } from "@/utils";
import { author, book } from "@prisma/client";

export const AuthorNode = builder.objectRef<author>("Author").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    books: t.connection({
      type: BookNode,
      resolve: async (parent, args, context) => {
        const allBooks = await context.loaders.booksByAuthor.load(
          parent.id,
        );

        const sortedBooks = [...allBooks].sort((a, b) => compare(a.id, b.id));

        const take = args.first ?? 10;

        let startIndex = 0;
        if (args.after) {
          const cursorIndex = sortedBooks.findIndex(
            (book) => book.id === parseInt(args.after ?? ""),
          );
          startIndex = cursorIndex + 1;
        }

        const paginatedBooks = sortedBooks.slice(
          startIndex,
          startIndex + take + 1,
        );

        const hasNextPage = paginatedBooks.length > take;
        const nodes = hasNextPage
          ? paginatedBooks.slice(0, -1)
          : paginatedBooks;

        const edges = nodes.map((node) => ({
          cursor: node.id?.toString(),
          node,
        })) as Array<{
          cursor: string;
          node: book;
        }>;

        return {
          edges,
          pageInfo: {
            hasNextPage,
            hasPreviousPage: !!args.after,
            startCursor: edges[0]?.cursor ?? null,
            endCursor: edges[edges.length - 1]?.cursor ?? null,
          },
        };
      },
    }),
  }),
});

export function addAuthorNode(t: QueryFieldBuilder) {
  return t.field({
    type: [AuthorNode],
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (_parent, args) => {
      return prisma.author.findMany({
        where: {
          id: parseInt(args.id),
        },
      });
    },
  });
}
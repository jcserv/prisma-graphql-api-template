import { builder, QueryFieldBuilder } from "@/graphql/builder";
import { prisma } from "@/db";
import { GraphQLError } from "graphql";

builder.prismaNode("book", {
  id: {
    field: "id",
    description: "A unique string identifier for a card, used for pagination.",
  },
  fields: (t) => ({
    bookId: t.exposeID("id", {
      description: "The numeric unique identifier of the book.",
    }),
    title: t.exposeString("title", { description: "The title of the book." }),
  }),
});

export function addBookNode(t: QueryFieldBuilder) {
  return t.prismaConnection({
    type: "book",
    cursor: "id",
    maxSize: 100,
    description: "The books written by the author.",
    args: {
      bookId: t.arg.int({
        required: false,
        description: "The numeric unique identifier of the book.",
      }),
    },
    resolve: async (query, _parent, args) => {
      if ((args.first ?? 0) + (args.last ?? 0) > 100) {
        throw new GraphQLError("Invalid argument value", {
          extensions: {
            code: "BAD_USER_INPUT",
            detail: "The maximum amount of cards that can be returned is 100",
          },
        });
      }
      if (args.bookId) {
        const book = await prisma.book.findUnique({
          where: {
            id: args.bookId,
          },
        });
        return book ? [book] : [];
      }
      return prisma.book.findMany({
        ...query,
      });
    },
  });
}

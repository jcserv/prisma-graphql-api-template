import { GraphQLError } from "graphql";

import { prisma } from "@/db";
import { builder, QueryFieldBuilder } from "@/graphql/builder";

builder.prismaNode("author", {
  id: {
    field: "id",
    description: "A unique string identifier for a card, used for pagination.",
  },
  fields: (t) => ({
    authorId: t.exposeID("id", {
      description: "The numeric unique identifier of the author.",
    }),
    name: t.exposeString("name", { description: "The name of the author." }),
    books: t.relatedConnection("book", {
      cursor: 'id',
    }),
  }),
});

export function addAuthorNode(t: QueryFieldBuilder) {
  return t.prismaConnection({
    type: "author",
    cursor: "id",
    maxSize: 100,
    args: {
      authorId: t.arg.int({
        required: false,
        description: "The numeric unique identifier of the author.",
      }),
    },
    resolve: async (query, _parent, args) => {
      if ((args.first ?? 0 ) + (args.last ?? 0) > 100) {
        throw new GraphQLError('Invalid argument value', {
          extensions: {
            code: 'BAD_USER_INPUT',
            detail: 'The maximum amount of cards that can be returned is 100',
          },
        });
      }
      if (args.authorId) {
        const author = await prisma.author.findUnique({
          where: {
            id: args.authorId,
          },
        });
        return author ? [author] : [];
      }
      return prisma.author.findMany({
        ...query,
      });
    },
  });
}

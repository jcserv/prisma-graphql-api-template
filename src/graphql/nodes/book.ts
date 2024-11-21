import { book } from "@prisma/client";
import { builder, QueryFieldBuilder } from "@/graphql/builder";
import { prisma } from "@/db";

export const BookNode = builder.objectRef<book>("Book").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
  }),
});

export function addBookNode(t: QueryFieldBuilder) {
  return t.field({
    type: [BookNode],
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (parent, args) => {
      return prisma.book.findMany({
        where: {
          id: parseInt(args.id),
        },
      });
    },
  });
}
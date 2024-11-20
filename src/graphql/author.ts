import { BookNode } from "@/graphql/book";
import { AuthorRef } from "@/graphql/builder";
import { prisma } from "@/db";

export const AuthorNode = AuthorRef.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    books: t.connection({
      type: BookNode,
      resolve: async (parent, args) => {
        const take = args.first ?? 10;
        const skip = args.after ? 1 : 0;
        const cursor = args.after ? { id: parseInt(args.after) } : undefined;

        const books = await prisma.book.findMany({
          take: take + 1,
          skip,
          cursor,
          where: {
            author_id: parseInt(parent.id as string),
          },
          orderBy: {
            id: "asc",
          },
        });

        const hasNextPage = books.length > take;
        const nodes = hasNextPage ? books.slice(0, -1) : books;

        const edges = nodes.map((node) => ({
          cursor: node.id.toString(),
          node,
        }));

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
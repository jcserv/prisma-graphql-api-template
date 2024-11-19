import { DateResolver } from "graphql-scalars";
import SchemaBuilder from "@pothos/core";

import DataloaderPlugin from "@pothos/plugin-dataloader";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import RelayPlugin from "@pothos/plugin-relay";

import { prisma } from "@/db";
import { Author, Book } from "@/__generated__/graphql";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
}>({
  plugins: [DataloaderPlugin, PrismaPlugin, RelayPlugin],
  prisma: {
    client: prisma,
  },
  relay: {
    cursorType: "String",
    clientMutationId: "omit",
    nodesOnConnection: true,
  },
});

builder.addScalarType("Date", DateResolver, {});

const BookRef = builder.objectRef<Book>("Book");
const BookNode = BookRef.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
  }),
});

const AuthorRef = builder.objectRef<Author>("Author");
const AuthorNode =AuthorRef.implement({
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

builder.queryType({
  fields: (t) => ({
    authors: t.field({
      type: [AuthorNode],
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (parent, args) => {
        return prisma.author.findMany({
          where: {
            id: parseInt(args.id),
          }
        });
      },
    }),
    books: t.field({
      type: [BookNode],
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (parent, args) => {
        return prisma.book.findMany({
          where: {
            id: parseInt(args.id),
          }
        })
      },
    }), 
  }),
});

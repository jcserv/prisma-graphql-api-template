import { DateResolver } from "graphql-scalars";
import SchemaBuilder from "@pothos/core";
import DataloaderPlugin from '@pothos/plugin-dataloader';
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";

import { prisma } from "@/db";
import { Author, Book } from "@/__generated__/graphql";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
}>({
  plugins: [DataloaderPlugin, PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

builder.addScalarType("Date", DateResolver, {});

const AuthorNode = builder.objectRef<Author>("Author").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
  }),
});

const BookNode = builder.objectRef<Book>("Book").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
  }),
});

builder.queryType({
  fields: (t) => ({
    authors: t.field({
      type: [AuthorNode],
      resolve: async (query) => {
        return prisma.author.findMany({ ...query });
      },
    }),
    books: t.field({
      type: [BookNode],
      resolve: async (query) => {
        return prisma.book.findMany({ ...query });
      },
    }),
  }),
});
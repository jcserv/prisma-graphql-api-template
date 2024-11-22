import { DateResolver } from "graphql-scalars";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import RelayPlugin from "@pothos/plugin-relay";

import { Context } from "@/context";
import { prisma } from "@/db";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: Context;
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  prisma: {
    client: prisma,
  },
  relay: {
    cursorType: "String",
    clientMutationId: "omit",
    nodesOnConnection: false,
    nodeQueryOptions: false,
    nodesQueryOptions: false,
  },
});

builder.addScalarType("Date", DateResolver, {});

type BuilderTypes = typeof builder.$inferSchemaTypes;

export type QueryFieldBuilder = PothosSchemaTypes.QueryFieldBuilder<
  BuilderTypes,
  object
>;

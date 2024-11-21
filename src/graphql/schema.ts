import { builder } from "@/graphql/builder";

// Imports to ensure types are defined
import "@/graphql/nodes/author";
import "@/graphql/nodes/book";
import "@/graphql/query";

export function createPothosSchema() {
  return {
    public: builder.toSchema({}),
  };
}

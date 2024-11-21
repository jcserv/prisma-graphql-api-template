import { addAuthorNode } from "@/graphql/nodes/author";
import { builder } from "@/graphql/builder";
import { addBookNode } from "@/graphql/nodes/book";

builder.queryType({
  fields: (t) => ({
    authors: addAuthorNode(t),
    books: addBookNode(t),
  }),
});

import { BookRef } from "@/graphql/builder";

export const BookNode = BookRef.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
  }),
});
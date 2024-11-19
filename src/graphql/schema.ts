import { builder } from '@/graphql/builder';

export function createPothosSchema() {
    return {
        public: builder.toSchema({})
    }
}
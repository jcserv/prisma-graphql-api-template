import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: number; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  authors?: Maybe<QueryAuthorsConnection>;
  /** The books written by the author. */
  books?: Maybe<QueryBooksConnection>;
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
};


export type QueryAuthorsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  authorId?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBooksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryAuthorsConnection = {
  __typename?: 'QueryAuthorsConnection';
  edges?: Maybe<Array<Maybe<QueryAuthorsConnectionEdge>>>;
  pageInfo: PageInfo;
};

export type QueryAuthorsConnectionEdge = {
  __typename?: 'QueryAuthorsConnectionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Author>;
};

export type QueryBooksConnection = {
  __typename?: 'QueryBooksConnection';
  edges?: Maybe<Array<Maybe<QueryBooksConnectionEdge>>>;
  pageInfo: PageInfo;
};

export type QueryBooksConnectionEdge = {
  __typename?: 'QueryBooksConnectionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Book>;
};

export type Author = Node & {
  __typename?: 'author';
  /** The numeric unique identifier of the author. */
  authorId?: Maybe<Scalars['ID']['output']>;
  books?: Maybe<AuthorBooksConnection>;
  /** A unique string identifier for a card, used for pagination. */
  id: Scalars['ID']['output'];
  /** The name of the author. */
  name?: Maybe<Scalars['String']['output']>;
};


export type AuthorBooksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type AuthorBooksConnection = {
  __typename?: 'authorBooksConnection';
  edges?: Maybe<Array<Maybe<AuthorBooksConnectionEdge>>>;
  pageInfo: PageInfo;
};

export type AuthorBooksConnectionEdge = {
  __typename?: 'authorBooksConnectionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Book>;
};

export type Book = Node & {
  __typename?: 'book';
  /** The numeric unique identifier of the book. */
  bookId?: Maybe<Scalars['ID']['output']>;
  /** A unique string identifier for a card, used for pagination. */
  id: Scalars['ID']['output'];
  /** The title of the book. */
  title?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Node: ( Author ) | ( Book );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  QueryAuthorsConnection: ResolverTypeWrapper<QueryAuthorsConnection>;
  QueryAuthorsConnectionEdge: ResolverTypeWrapper<QueryAuthorsConnectionEdge>;
  QueryBooksConnection: ResolverTypeWrapper<QueryBooksConnection>;
  QueryBooksConnectionEdge: ResolverTypeWrapper<QueryBooksConnectionEdge>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  author: ResolverTypeWrapper<Author>;
  authorBooksConnection: ResolverTypeWrapper<AuthorBooksConnection>;
  authorBooksConnectionEdge: ResolverTypeWrapper<AuthorBooksConnectionEdge>;
  book: ResolverTypeWrapper<Book>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  PageInfo: PageInfo;
  Query: {};
  QueryAuthorsConnection: QueryAuthorsConnection;
  QueryAuthorsConnectionEdge: QueryAuthorsConnectionEdge;
  QueryBooksConnection: QueryBooksConnection;
  QueryBooksConnectionEdge: QueryBooksConnectionEdge;
  String: Scalars['String']['output'];
  author: Author;
  authorBooksConnection: AuthorBooksConnection;
  authorBooksConnectionEdge: AuthorBooksConnectionEdge;
  book: Book;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'author' | 'book', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  authors?: Resolver<Maybe<ResolversTypes['QueryAuthorsConnection']>, ParentType, ContextType, Partial<QueryAuthorsArgs>>;
  books?: Resolver<Maybe<ResolversTypes['QueryBooksConnection']>, ParentType, ContextType, Partial<QueryBooksArgs>>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  nodes?: Resolver<Array<Maybe<ResolversTypes['Node']>>, ParentType, ContextType, RequireFields<QueryNodesArgs, 'ids'>>;
};

export type QueryAuthorsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueryAuthorsConnection'] = ResolversParentTypes['QueryAuthorsConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['QueryAuthorsConnectionEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryAuthorsConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueryAuthorsConnectionEdge'] = ResolversParentTypes['QueryAuthorsConnectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['author']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryBooksConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueryBooksConnection'] = ResolversParentTypes['QueryBooksConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['QueryBooksConnectionEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryBooksConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueryBooksConnectionEdge'] = ResolversParentTypes['QueryBooksConnectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['book']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['author'] = ResolversParentTypes['author']> = {
  authorId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  books?: Resolver<Maybe<ResolversTypes['authorBooksConnection']>, ParentType, ContextType, Partial<AuthorBooksArgs>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorBooksConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['authorBooksConnection'] = ResolversParentTypes['authorBooksConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['authorBooksConnectionEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorBooksConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['authorBooksConnectionEdge'] = ResolversParentTypes['authorBooksConnectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['book']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['book'] = ResolversParentTypes['book']> = {
  bookId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QueryAuthorsConnection?: QueryAuthorsConnectionResolvers<ContextType>;
  QueryAuthorsConnectionEdge?: QueryAuthorsConnectionEdgeResolvers<ContextType>;
  QueryBooksConnection?: QueryBooksConnectionResolvers<ContextType>;
  QueryBooksConnectionEdge?: QueryBooksConnectionEdgeResolvers<ContextType>;
  author?: AuthorResolvers<ContextType>;
  authorBooksConnection?: AuthorBooksConnectionResolvers<ContextType>;
  authorBooksConnectionEdge?: AuthorBooksConnectionEdgeResolvers<ContextType>;
  book?: BookResolvers<ContextType>;
};


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: Int!
    title: String!
    author: String!
    deferredInfo: DeferredInfo
  }

  input BookInput {
    title: String!
    author: String!
  }
  input DeleteBookInput {
    id: Int!
  }

  type DeferredInfo {
    id: Int!
    title: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book!]
  }
  type Mutation {
    addBook(book: BookInput!): Book!
    deleteBook(book: DeleteBookInput!): Boolean!
  }

  directive @defer(
  if: Boolean
  label: String
) on FRAGMENT_SPREAD | INLINE_FRAGMENT
directive @stream(if: Boolean, label: String, initialCount: Int = 0) on FIELD
`;

const books = [
  {
    id: 1,
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: 2,
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: async (_, { book }) => {
      const maxId = books.length ? Math.max(...books.map((b) => b.id)) : 0;
      const bookWithDeferredInfo = {
        ...book,
        id: maxId + 1,
      };
      books.push(bookWithDeferredInfo);
      return bookWithDeferredInfo;
    },
    deleteBook: async (_, { book }) => {
      const index = books.findIndex((b) => b.id === book.id);
      if (index === -1) {
        return false;
      }
      books.splice(index, 1);
      return true;
    },
  },
  Book: {
    deferredInfo: async (parent) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: parent.id,
            title: parent.title + " deferred",
          });
        }, 1000);
      });
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

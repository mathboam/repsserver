const { ApolloServer, gql } = require("apollo-server-express");

// Schemas and their resolvers
const payment = require("./domains/payments/");
const images = require("./domains/images/");
const member = require("./domains/members");

let root = "Reps";

const rootTypeDef = gql`
  scalar Date

  input Pagination {
    skip: Int
    limit: Int
  }

  type Query {
    root: String
  }

  type Mutation {
    root(root: String): String
  }
`;

const rootResolver = {
  Query: {
    root: function () {
      return root;
    },
  },
  Mutation: {
    root: function (_, args) {
      root = args;
      return root;
    },
  },
};

//configuring gql server

function GraphQlServer() {
  return new ApolloServer({
    typeDefs: [rootTypeDef, payment.typeDefs, member.typeDefs, images.typeDefs],
    resolvers: [
      rootResolver,
      payment.resolvers,
      member.resolvers,
      images.resolvers,
    ],
    introspection: true,
    playground: true,
    tracing: true,
  });
}

module.exports = GraphQlServer;

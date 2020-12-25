const { ApolloServer, gql } = require("apollo-server-express");
const { AuthenticateToken } = require("./domains/helpers/index");
// Schemas and their resolvers
const payment = require("./domains/payments/");
const images = require("./domains/images/");
const member = require("./domains/members");
const group = require("./domains/groups");

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
    typeDefs: [
      rootTypeDef,
      payment.typeDefs,
      member.typeDefs,
      images.typeDefs,
      group.typeDefs,
    ],
    resolvers: [
      rootResolver,
      payment.resolvers,
      member.resolvers,
      images.resolvers,
      group.resolvers,
    ],
    context: ({ req }) => {
      return { token: req.headers.authorization };
    },
    introspection: true,
    playground: true,
    tracing: true,
  });
}

module.exports = GraphQlServer;

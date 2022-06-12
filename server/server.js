const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = require("./src/typeDefs");
const resolvers = require("./src/resolvers");
const permisions = require("./src/permissions");

const prisma = new PrismaClient();

function createContext(req) {
  return {
    ...req,
    prisma,
  };
}

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permisions
);

const server = new ApolloServer({
  schema,
  context: createContext,
});

server.listen().then(({ url }) => {
  console.log("Server is up at " + url);
});
console.log(process.env.NODE_ENV);

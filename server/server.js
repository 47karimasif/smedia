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

const corsOptions = {
  origin: "*",
};

const server = new ApolloServer({
  schema,
  context: createContext,
  cors: corsOptions,
});

const port = process.env.PORT || 4000;

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
console.log(process.env.NODE_ENV);

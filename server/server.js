import { ApolloServer } from "apollo-server";
import { typeDefs } from "./src/typeDefs.js";
import resolvers from "./src/resolvers/index.js";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

function createContext(req) {
  return {
    ...req,
    prisma,
  };
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

server.listen().then(({ url }) => {
  console.log("Server is up at " + url);
});

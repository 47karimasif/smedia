import userResolver from "./user.js";

export default {
  Query: {
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};

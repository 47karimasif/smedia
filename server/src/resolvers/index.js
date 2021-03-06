const userResolver = require("./user");
const profileResolver = require("./profile");
const tweetResolver = require("./tweet");

module.exports = {
  Tweet: {
    author: async (parent, args, context) => {
      const author = await context.prisma.User.findUnique({
        where: {
          id: Number(parent.authorId),
        },
      });
      return author;
    },
  },
  User: {
    Profile: async (parent, args, context) => {
      const profile = await context.prisma.Profile.findUnique({
        where: {
          userId: parseInt(parent.id),
        },
      });
      return profile;
    },
  },
  Query: {
    ...userResolver.Query,
    ...profileResolver.Query,
    ...tweetResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...profileResolver.Mutation,
    ...tweetResolver.Mutation,
  },
};

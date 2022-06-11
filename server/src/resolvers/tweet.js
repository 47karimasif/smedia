const { getUserId } = require("../permissions/Utils");

module.exports = {
  Query: {
    Tweets: (parent, args, context) => {
      return context.prisma.Tweet.findMany();
    },
  },

  Mutation: {
    createTweet: async (parent, { content }, context) => {
      const userId = getUserId(context);
      if (!userId) throw new Error("Could not authenticate user.");
      return context.prisma.Tweet.create({
        data: {
          content,
          author: { connect: { id: Number(userId) } },
        },
      });
    },
  },
};

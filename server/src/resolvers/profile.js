const { getUserId } = require("../permissions/Utils");

module.exports = {
  Query: {},

  Mutation: {
    createProfile: async (parent, args, context) => {
      const userId = getUserId(context);
      if (!userId) throw new Error("Could not authenticate user.");
      return context.prisma.Profile.create({
        data: {
          ...args,
          User: { connect: { id: Number(userId) } },
        },
      });
    },
    updateProfile: async (parent, { id, ...args }, context) => {
      const userId = getUserId(context);
      if (!userId) throw new Error("Could not authenticate user.");
      return context.prisma.Profile.update({
        data: {
          ...args,
        },
        where: {
          id: Number(id),
        },
      });
    },
  },
};

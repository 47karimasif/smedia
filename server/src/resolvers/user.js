const { compare, hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { getUserId, APP_SECRET } = require("../permissions/Utils");

module.exports = {
  Query: {
    me: (parent, args, context) => {
      console.log(context);
      const userId = getUserId(context);
      return context.prisma.User.findUnique({
        where: {
          id: Number(userId),
        },
      });
    },

    allUsers: (parent, args, context) => {
      return context.prisma.User.findMany();
    },
  },

  Mutation: {
    signup: async (parent, { input }, context) => {
      const { name, email, password } = input;
      const hashedPassword = await hash(password, 10);
      const user = await context.prisma.User.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });
      return {
        token: sign({ userId: user.id }, APP_SECRET),
        ...user,
      };
    },
    login: async (parent, { input }, context) => {
      const { email, password } = input;
      const user = await context.prisma.User.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error(`No user found for email: ${email}`);
      }
      const passwordValid = await compare(password, user.password);
      if (!passwordValid) {
        throw new Error("Invalid password");
      }
      return {
        token: sign({ userId: user.id }, APP_SECRET),
        ...user,
      };
    },
  },
};

const userResolver = {
  Query: {
    me: () => {
      return { name: "asif" };
    },
    allUsers: (parent, args, context) => {
      return context.prisma.User.findMany();
    },
  },

  Mutation: {
    signup: async (parent, { input }, context) => {
      const { name, email, password } = input;
      // const hashedPassword = await hash(args.password, 10)
      const user = await context.prisma.User.create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
      console.log(user);
      return user;
    },
  },
};

export default userResolver;

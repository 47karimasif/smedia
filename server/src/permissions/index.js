const { shield, rule } = require("graphql-shield");
const { getUserId } = require("./Utils");

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isPostOwner: rule()(async (_parent, args, context) => {
    const userId = getUserId(context);
    const author = await context.prisma.post
      .findUnique({
        where: {
          id: Number(args.id),
        },
      })
      .author();
    return userId === author.id;
  }),
};

module.exports = shield({
  Query: {
    me: rules.isAuthenticatedUser,
  },
  Mutation: {},
});

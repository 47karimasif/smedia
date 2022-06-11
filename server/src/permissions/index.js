const { shield, rule, not } = require("graphql-shield");
const { getUserId } = require("./Utils");

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
};

module.exports = shield({
  Query: {
    me: rules.isAuthenticatedUser,
  },
  Mutation: {},

  // comment these rules to check in local
  User: {
    Profile: rules.isAuthenticatedUser,
  },
  Tweet: {
    author: rules.isAuthenticatedUser,
  },
});

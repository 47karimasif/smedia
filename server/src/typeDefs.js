const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    token: String
    Profile: Profile
  }

  type Profile {
    avatar: String
    bio: String
    id: Int!
    published: Boolean!
    title: String!
    location: String
    website: String
  }

  input signupInput {
    name: String!
    email: String!
    password: String!
  }
  input loginInput {
    email: String!
    password: String!
  }

  type Query {
    me: User!
    allUsers: [User!]
  }
  type Mutation {
    signup(input: signupInput): User!
    login(input: loginInput): User!
    createProfile(
      avatar: String
      bio: String
      location: String
      website: String
    ): Profile
    updateProfile(
      avatar: String
      bio: String
      id: Int
      location: String
      website: String
    ): Profile
  }
`;

import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    token: String
  }

  type Post {
    id: ID
    createdAt: String
    updatedAt: String
    title: String
    published: Boolean
    viewCount: Int
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
    me: User
    allUsers: [User!]
  }
  type Mutation {
    signup(input: signupInput): User!
    login(input: loginInput): User!
  }
`;

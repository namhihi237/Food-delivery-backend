import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    email: String!
    fullName: String!
    phoneNumber: String
    image: String
    role: String
    point: Int
    address: String
    promoCode: String
  }

  type Category {
    id: ID!
    name: String!
    image: String
  }

  type Admin {
    id: ID!
    userName: String!
    role: String!
  }

  type Query {
    user(id: ID!): User!
    getMe: User!
    getCategories: [Category!]!
  }

  type Mutation {
    register(email: String!, fullName: String!, password: String!): User!
    login(email: String!, password: String!, firebaseIdentifier: String): JWTResponse!
    logout: Boolean!
  }

  type JWTResponse {
    user: User!
    token: String!
  }

  enum OrderByEnum {
    asc
    desc
  }
`;

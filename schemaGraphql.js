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

  type Review {
    id: ID!
    user: User!
    comment: String!
    rating: Int!
    image: String
    createdAt: String!
  }

  type Item {
    id: ID!
    name: String!
    image: String!
    price: Int!
    category: Category
    description: String
    rating: Int
    reviews: [Review]
  }

  type CartItem {
    id: ID!
    item: Item!
    quantity: Int!
  }

  type resultItems {
    items: [Item]!
    total: Int!
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
    getItems(skip: Int, limit: Int, filter: itemFilter, orderBy: OrderByList ): resultItems!
    getItem(id: ID!): Item!
    getCartItems: [CartItem!]!
  }

  type Mutation {
    register(email: String!, fullName: String!, password: String!): User!
    login(email: String!, password: String!, firebaseIdentifier: String): JWTResponse!
    logout: Boolean!
    addToCart(itemId: ID!, quantity: Int!): CartItem!
    deleteCartItem(id: ID!): Boolean!
    getCodeActivePhoneNumber(phoneNumber: String!): Boolean!
    activePhoneNumber(phoneNumber: String!, code: String!): Boolean!

  }

  type JWTResponse {
    user: User!
    token: String!
  }

  input itemFilter {
    name: String
    categoryId: Int
  }

  input OrderByList {
    name: OrderByEnum
    price: OrderByEnum
    rating: OrderByEnum
    creatAt: OrderByEnum
  }

  enum OrderByEnum {
    asc
    desc
  }

`;

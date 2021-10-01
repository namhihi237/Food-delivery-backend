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
    createdAt: String!
  }

  type resultItems {
    items: [Item]!
    total: Int!
  }
  type OrderItem {
    id: ID!
    item: Item!
    price: Int!
    name: String!
    image: String!
    quantity: Int!
  }

  type Order {
    id: ID!
    subTotal: Int!
    total: Int!
    shipping: Int!
    grandTotal: Int!
    items: [OrderItem]!
    discount: Int!
    address: String!
    phoneNumber: String!
    name: String!
    deliveryTime: String!
    note: String!
    status: String!
    createdAt: String!
  }

  type resultOrders {
    orders: [Order]!
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
    getItems(skip: Int, limit: Int, filter: itemFilter, orderBy: ItemOrderBy ): resultItems!
    getItem(id: ID!): Item!
    getCartItems: [CartItem!]!
    listOrders(skip: Int, limit: Int, filter: orderFilter, orderBy: OrderOrderBy): resultOrders!
    detailOrder(id: ID!): Order!
  }

  type Mutation {
    register(phoneNumber: String!, fullName: String!, password: String!): User!
    activePhoneNumber(phoneNumber: String!, code: String!): JWTResponse!
    login(phoneNumber: String!, password: String!, firebaseIdentifier: String): JWTResponse!
    logout: Boolean!
    addToCart(itemId: ID!, quantity: Int!): CartItem!
    deleteCartItem(id: ID!): Boolean!
    getCodePhoneNumber(phoneNumber: String!): Boolean!
    activeCodeReset(phoneNumber: String!, code: String!): Boolean!
    updatePassword(password: String!, phoneNumber: String!, code: String! ): Boolean!
    checkout(method: methodEnum!, note: String, voucherCode: String ): Order!

  }

  type JWTResponse {
    user: User!
    token: String!
  }

  input itemFilter {
    name: String
    categoryId: Int
  }

  input orderFilter {
    status: statusOrderEnum
  }

  input ItemOrderBy {
    name: OrderByEnum
    price: OrderByEnum
    rating: OrderByEnum
    creatAt: OrderByEnum
  }

  input OrderOrderBy {
    creatAt: OrderByEnum
    grandTotal: OrderByEnum
    subTotal: OrderByEnum
  }

  enum OrderByEnum {
    asc
    desc
  }

  enum methodEnum {
    COD
    ONLINE
  }

  enum statusOrderEnum {
    PAST
    CURRENT
  }

`;

import { authenticationMutation } from './authentication';
import { categoryQuery } from './category';
import { itemQuery, Item, Review } from './item';
import { cartQuery, cartMutation, CartItem, Order } from './cart';
import { userQuery } from './user';

export default {
  Item,
  Review,
  CartItem,
  Order,

  Query: {
    ...categoryQuery,
    ...itemQuery,
    ...cartQuery,
    ...userQuery,
  },

  Mutation: {
    ...authenticationMutation,
    ...cartMutation,
  }
};

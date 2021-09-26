import { authenticationMutation } from './authentication';
import { categoryQuery } from './category';
import { itemQuery, Item, Review } from './item';
import { cartQuery, cartMutation, CartItem } from './cart';

export default {
  Item,
  Review,
  CartItem,

  Query: {
    ...categoryQuery,
    ...itemQuery,
    ...cartQuery,
  },

  Mutation: {
    ...authenticationMutation,
    ...cartMutation,
  }
};

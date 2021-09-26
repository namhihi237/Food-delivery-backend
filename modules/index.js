import { authenticationMutation } from './authentication';
import { categoryQuery } from './category';
import { itemQuery, Item, Review } from './item';
import { cartQuery } from './cart';

export default {
  Item,
  Review,

  Query: {
    ...categoryQuery,
    ...itemQuery,
    ...cartQuery,
  },

  Mutation: {
    ...authenticationMutation
  }
};

import { authenticationMutation } from './authentication';
import { categoryQuery } from './category';
import { itemQuery, Item, Review } from './item';

export default {
  Item,
  Review,

  Query: {
    ...categoryQuery,
    ...itemQuery,
  },

  Mutation: {
    ...authenticationMutation
  }
};

import { authenticationMutation } from './authentication';
import { categoryQuery } from './category';
import { itemQuery, Item } from './item';

export default {
  Item,

  Query: {
    ...categoryQuery,
    ...itemQuery,
  },

  Mutation: {
    ...authenticationMutation
  }
};

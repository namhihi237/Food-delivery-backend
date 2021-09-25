import { authenticationMutation } from './authentication';
import { categoryQuery } from './category';

export default {
  Query: {
    ...categoryQuery,
  },

  Mutation: {
    ...authenticationMutation
  }
};

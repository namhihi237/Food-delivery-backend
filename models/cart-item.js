import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * CartItem model
 * @author Nam Le
 */
const CartItem = sequelize.define('CartItem', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  quality: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    }
  },
});

export default CartItem;

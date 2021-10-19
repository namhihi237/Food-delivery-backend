import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * CartItem model
 * @author Nam Le
 */
const CartItem = sequelize.define('CartItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    }
  },
});

CartItem.associate = models => {
  CartItem.belongsTo(models.Items, { as: 'items', foreignKey: 'itemId' });
}

export default CartItem;

import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * OrderItem model
 * @author Nam Le
 */
const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  discount: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  quality: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    }
  },
  note: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
});

export default OrderItem;
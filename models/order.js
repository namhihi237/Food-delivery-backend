import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Order model
 * @author Nam Le
 */
const Order = sequelize.define('Order', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  voucherCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  discount: { //the total discount of the Order based on the promo code
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  subTotal: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  shipping: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  grandTotal: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  name: {
    type: Sequelize.STRING(250),
    allowNull: false,
    validate: {
      min: 1,
      max: 250,
    }
  },
  address: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  deliveryTime: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
    }
  },
  status: {
    type: Sequelize.ENUM,
    values: ['NEW', 'SHIPPING', 'CANCELLED', 'RETURNED', 'COMPLETED'],
    allowNull: false,
    defaultValue: 'new',
  },
  note: {
    type: Sequelize.STRING(250),
    allowNull: true,
  }
});

Order.associate = models => {
  Order.belongsToMany(models.Items, { through: 'ItemTags' });
  Order.hasMany(models.OrderItems, { as: 'orderItems' });
}

export default Order;

import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Item model
 * @author Nam Le
 */
const Item = sequelize.define('Item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(250),
    validate: {
      len: [0, 250]
    }
  },
  price: {
    type: Sequelize.FLOAT,
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  numberOfReviews: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  description: {
    type: Sequelize.STRING(500),
    validate: {
      len: [0, 500]
    }
  },
  image: {
    type: Sequelize.STRING(250),
    validate: {
      len: [0, 250]
    }
  },
  maxDiscount: {
    type: Sequelize.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
    }
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  }
});

Item.associate = models => {
  Item.belongsToMany(models.Tags, { through: 'ItemTags' });
  Item.hasMany(models.OrderItems, { as: 'orderItems' });
  Item.hasMany(models.Reviews, { as: 'reviews' });
  Item.belongsTo(models.Categories, { as: 'categories', foreignKey: 'categoryId' });
}

export default Item;

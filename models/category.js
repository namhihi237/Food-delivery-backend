import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Category model
 * @author Nam Le
 */
const Category = sequelize.define('Category', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(100),
    validate: {
      len: [0, 100]
    }
  },
  image: {
    type: Sequelize.STRING(100),
    validate: {
      len: [0, 100]
    }
  }
});

Category.associate = models => {
  // Category.hasMany(models.Items, { as: 'items' });
}

export default Category;

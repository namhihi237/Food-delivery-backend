import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Category model
 * @author Nam Le
 */
const Category = sequelize.define('Category', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  name: {
    type: Sequelize.STRING(100),
    validate: {
      len: [0, 100]
    }
  },
});

Category.associate = models => {
  Category.hasMany(models.Items, { as: 'items' });
}

export default Category;

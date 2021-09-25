import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Tag model
 * @author Nam Le
 */
const Tag = sequelize.define('Tag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(100),
    validate: {
      len: [0, 100]
    }
  },
});

Tag.associate = models => {
  Tag.belongsToMany(models.Items, { through: 'ItemTags' });
}

export default Tag;

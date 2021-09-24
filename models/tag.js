import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Tag model
 * @author Nam Le
 */
const Tag = sequelize.define('Tag', {
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

Tag.associate = models => {
  Tag.belongsToMany(models.Items, {through: 'ItemTags'});
}

export default Tag;

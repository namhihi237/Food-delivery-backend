import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Review model
 * @author Nam Le
 */
const Review = sequelize.define('Review', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING(250),
    validate: {
      len: [0, 250]
    }
  },
});

export default Review;

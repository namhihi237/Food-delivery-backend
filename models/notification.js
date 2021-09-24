import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Notification model
 * @author Nam Le
 */
const Notification = sequelize.define('Notification', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  type: {
    type: Sequelize.ENUM,
    values: ['system', 'invite'],
  },
  content: {
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

export default Notification;

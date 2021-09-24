import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Message model
 * @author Nam Le
 */
const Message = sequelize.define('Message', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  type: {
    type: Sequelize.ENUM,
    values: ['text', 'image'],
  },
  content: {
    type: Sequelize.TEXT,
  },
  image: {
    type: Sequelize.STRING(150),
    validate: {
      isUrl: true,
    }
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
});

export default Message;

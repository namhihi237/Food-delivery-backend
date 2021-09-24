import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Feedback model
 * @author Nam Le
 */
const Feedback = sequelize.define('Feedback', {
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
  email: {
    type: Sequelize.STRING(100),
    validate: {
      len: [0, 100]
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING(10),
    validate: {
      len: [0, 10]
    }
  },
});

export default Feedback;

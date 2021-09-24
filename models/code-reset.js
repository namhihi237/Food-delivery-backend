import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * CodeReset model
 * @author Nam Le
 */
const CodeReset = sequelize.define('CodeReset', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  email: {
    type: Sequelize.STRING(100),
    validate: {
      len: [0, 100]
    }
  },
  phoneNumber: {
    type: Sequelize.STRING(20),
    validate: {
      len: [0, 10]
    }
  },
  code: {
    type: Sequelize.STRING(10),
    validate: {
      len: [0, 10]
    }
  },
});

export default CodeReset;
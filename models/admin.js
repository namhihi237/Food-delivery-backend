import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Admin model
 * @author Nam Le
 */
const Admin = sequelize.define('Admin', {
  id: {
    type: Sequelize.STRING(80),
    primaryKey: true,
    validate: {
      len: [0, 80]
    }
  },
  userName: {
    type: Sequelize.STRING(200),
    allowNull: true,
    validate: {
      len: [0, 200]
    }
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      len: [0, 100]
    }
  },
  role: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      len: [0, 50]
    }
  },
  lastLogin: {
    type: Sequelize.DATE,
    allowNull: true,
    validate: {
      isDate: true
    }
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

export default Admin;

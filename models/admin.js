import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Admin model
 * @author Nam Le
 */
const Admin = sequelize.define('Admin', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  userName: {
    type: Sequelize.STRING(200),
    allowNull: false,
    validate: {
      len: [0, 200]
    }
  },
  fullName: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      len: [0, 100]
    }
  },
  role: {
    type: Sequelize.ENUM('admin', 'employee'),
    allowNull: false,
    defaultValue: 'employee'
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

import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Branch model
 * @author Nam Le
 */
const Branch = sequelize.define('Branch', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  address: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  coverage: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  lastLogin: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

Branch.associate = models => {
  // Branch.hasMany(models.Orders, { as: 'orders' });
}

export default Branch;

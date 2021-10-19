import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Shipper model
 * @author Nam Le
 */
const Shipper = sequelize.define('Shipper', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  phoneNumber: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  gender: {
    type: Sequelize.ENUM('male', 'female'),
    allowNull: false
  },
  image: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  lastLogin: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

Shipper.associate = models => {
  // Shipper.hasMany(models.Orders, {
  //   foreignKey: 'shipperId'
  // });
  // Shipper.hasMany(models.Orders, { as: 'orders' });
}

export default Shipper;

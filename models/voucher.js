import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Voucher model
 * @author Nam Le
 */
const Voucher = sequelize.define('Voucher', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: Sequelize.ENUM('percentage', 'free-shipping', 'fixed'),
    allowNull: false
  },
  voucherCode: {
    type: Sequelize.STRING(10),
    allowNull: false,
    unique: true,
    validate: {
      min: 4,
      max: 10
    }
  },
  discount: {
    type: Sequelize.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
  expiredDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
    },
    allowNull: true
  },
  minTotal: {
    type: Sequelize.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
    }
  },
  maxDiscount: {
    type: Sequelize.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
    }
  }
});


export default Voucher;

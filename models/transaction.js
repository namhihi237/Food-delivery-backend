import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Transaction model
 * @author Nam Le
 */
const Transaction = sequelize.define('Transaction', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  methodPayment: {
    type: Sequelize.ENUM,
    values: ['OFFLINE', 'COD', 'ONLINE'],
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ['paid', 'unpaid'],
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

Transaction.associate = models => {
  Transaction.belongsTo(models.Orders);
}

export default Transaction;

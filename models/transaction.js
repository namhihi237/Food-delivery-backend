import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * Transaction model
 * @author Nam Le
 */
const Transaction = sequelize.define('Transaction', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
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
    values: ['NEW', 'CANCELLED', 'FAILED', 'PENDING', 'DECLINED', 'SUCCESS'],
    defaultValue: 'NEW',
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

Transaction.associate = models => {
  Transaction.belongsTo(models.Users, { foreignKey: 'userId', as: 'users' });
  Transaction.belongsTo(models.Orders, { foreignKey: 'orderId', as: 'orders', });
}

export default Transaction;

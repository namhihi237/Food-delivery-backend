import Sequelize from 'sequelize';

import { sequelize } from './db.js';

/**
 * User model
 * @author Nam Le
 */
const User = sequelize.define('User', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  email: {
    type: Sequelize.STRING(200),
    allowNull: true,
    validate: {
      len: [0, 200]
    }
  },
  phoneNumber: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      len: [0, 20]
    }
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: true,
    validate: {
      len: [0, 100]
    }
  },
  address: {
    type: Sequelize.STRING(250),
    allowNull: true,
  },
  fullName: {
    type: Sequelize.STRING(100),
    allowNull: true,
    validate: {
      len: [0, 100]
    }
  },
  image: {
    type: Sequelize.STRING(250),
    allowNull: true,
  },
  googleId: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  promoCode: {
    type: Sequelize.STRING(10),
    allowNull: true,
  },
  role: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      len: [0, 50]
    },
    defaultValue: 'user'
  },
  lastLogin: {
    type: Sequelize.DATE,
    allowNull: true,
    validate: {
      isDate: true
    }
  },
  point: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
    validate: {
      isInt: true
    }
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isBlocked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isNotification: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  }
});

User.associate = models => {
  User.hasMany(models.Orders, { as: 'orders' });
  User.hasMany(models.OrderItems, { as: 'orderItems' });
  User.hasMany(models.Reviews, { as: 'reviews' });
  User.hasMany(models.Notifications, { as: 'notifications' });
  User.hasMany(models.Messages, { as: 'messages' });
  User.hasMany(models.CartItems, { as: 'cartItems' });
  User.hasMany(models.Vouchers, { as: 'vouchers' });
}
export default User;

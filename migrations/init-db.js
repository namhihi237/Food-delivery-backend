import models from '../models';

const categories = [
  {
    name: 'Fast Food',
  },
  {
    name: 'Healthy Food',
  },
  {
    name: 'Dessert Item',
  },
  {
    name: 'Juice Item',
  },
  {
    name: 'Fruits Item',
  }
];

/**
 * Force initialize database. the old table will be replace with new structure
 */
// migration function
const initDb = async () => {
  const db = await models();
  try {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // remove old data
    await db.Categories.destroy({ where: {} });
    await db.Items.destroy({ where: {} });
    await db.Orders.destroy({ where: {} });
    await db.OrderItems.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
    await db.Feedbacks.destroy({ where: {} });
    await db.Reviews.destroy({ where: {} });
    await db.Messages.destroy({ where: {} });
    await db.Notifications.destroy({ where: {} });
    await db.Transactions.destroy({ where: {} });
    await db.Tags.destroy({ where: {} });
    await db.CodeResets.destroy({ where: {} });

    // create new data
    await db.Categories.bulkCreate(categories);

    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Init database success!');
  } catch (error) {
    console.log('Init database error!', error);
  }
}

initDb();
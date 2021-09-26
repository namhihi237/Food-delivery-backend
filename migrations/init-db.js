import models from '../models';
import { bcryptUtils } from '../utils';

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

const items = [
  {
    name: 'Chicken Burger',
    price: 10,
    description: 'Chicken Burger',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    categoryId: 1,
  },
  {
    name: 'Beef Burger',
    price: 15,
    description: 'Beef Burger',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    categoryId: 2,
  },
  {
    name: 'Chicken Burger',
    price: 10,
    description: 'Chicken Burger',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    categoryId: 3,
  },
  {
    name: 'Beef Burger',
    price: 20,
    description: 'Beef Burger',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    categoryId: 1,
  },
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
    await db.Items.bulkCreate(items);

    // create user 

    const password = await bcryptUtils.hashPassword('123456');
    const user = await db.Users.create({
      email: 'yentth237@gmail.com',
      password,
      fullName: 'Le Trung Nam',
      isActive: true,
    });

    const item = await db.Items.findOne();

    // create cart item
    await db.CartItems.create({
      UserId: user.id,
      itemId: item.id,
      quantity: 1,
    });

    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Init database success!');
  } catch (error) {
    console.log('Init database error!', error);
  }
}

initDb();
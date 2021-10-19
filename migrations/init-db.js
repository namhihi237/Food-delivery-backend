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
    maxDiscount: 2,
    discount: 0.1,
  },
  {
    name: 'Beef Burger',
    price: 15,
    description: 'Beef Burger',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    categoryId: 2,
    maxDiscount: 3,
    discount: 10,
  },
  {
    name: 'Chicken Burger',
    price: 10,
    description: 'Chicken Burger',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    categoryId: 3,
    maxDiscount: 2,
    discount: 12,
  },
  {
    name: 'Beef Burger',
    price: 20,
    description: 'Beef Burger',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    categoryId: 1,
    maxDiscount: 4,
    discount: 13,
  },
];

let vouchers = [
  {
    voucherCode: 'ABCD',
    type: 'percentage',
    discount: 10,
    maxDiscount: 4,
  },
  {
    voucherCode: 'EFGH',
    type: 'fixed',
    discount: 5,
    minTotal: 50,
  },
  {
    voucherCode: 'IJKL',
    type: 'free-shipping',
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
    await db.CodeResets.destroy({ where: {} });
    await db.Vouchers.destroy({ where: {} });
    await db.CartItems.destroy({ where: {} });

    // create new data
    await db.Categories.bulkCreate(categories);
    await db.Items.bulkCreate(items);

    // create user 

    const password = await bcryptUtils.hashPassword('123456');
    const user = await db.Users.create({
      id: 'cfeeaf60-1fc4-11ec-a6eb-ab44621d82c4',
      email: 'yentth237@gmail.com',
      password,
      fullName: 'Le Trung Nam',
      phoneNumber: '+84989402047',
      address: '120 Nguyen Luong Bang, Hoa Khanh Bac, Lien Chieu, Da Nang',
      isActive: true,
    });

    // create voucher
    vouchers = vouchers.map(voucher => {
      return { ...voucher, UserId: user.id }
    });
    await db.Vouchers.bulkCreate(vouchers);

    const itemsCreate = await db.Items.findAll();

    // create cart item
    await db.CartItems.bulkCreate([
      { UserId: user.id, itemId: itemsCreate[0].id, quantity: 1, },
      { UserId: user.id, itemId: itemsCreate[1].id, quantity: 3, }
    ]);



    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Init database success!');
  } catch (error) {
    console.log('Init database error!', error);
  }
}

initDb();
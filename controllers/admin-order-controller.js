
import { imageUtils } from '../utils';

class AdminOrderController {
  constructor(db) {
    this.db = db;
    this.rootModule = 'admin/modules/'
  }

  async listOrders(req, res) {
    global.logger.info('AdminOrderController::listOrders', JSON.stringify(req.query));

    try {
      let { page = 1 } = req.query;
      const limit = 6;
      let offset = (page - 1) * limit;

      let options = {
        include: [{
          model: this.db.Users,
          as: 'User',
          attributes: ['id', 'fullName', 'email']
        }, {
          model: this.db.Branches,
          as: 'Branch',
        }, {
          model: this.db.Transactions,
          as: 'Transaction',
        }],
      };

      let count = await this.db.Orders.count(options);

      options.limit = limit;
      options.offset = offset;

      let orders = await this.db.Orders.findAll(options);


      let branches = await this.db.Branches.findAll();

      orders = JSON.parse(JSON.stringify(orders));
      branches = JSON.parse(JSON.stringify(branches));

      return res.render(this.rootModule + 'order/list', {
        orders,
        branches,
        count,
        limit,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        titlePage: 'List of Orders'
      });
    } catch (error) {
      global.logger.error('AdminOrderController::listOrders', error);
      res.render(this.rootModule + 'error/404', {
        status: 500,
        message: 'Internal Server Error'
      });
    }
  }
}

export default AdminOrderController;
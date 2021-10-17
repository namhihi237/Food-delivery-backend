
import { imageUtils } from '../utils';

class AdminItemController {
  constructor(db) {
    this.db = db;
    this.rootModule = 'admin/modules/'
  }

  async listItems(req, res) {
    global.logger.info('AdminItemController.listProducts');

    try {
      const items = await this.db.Items.findAll();
      return res.render(this.rootModule + 'product/list', {
        items,
      });

    } catch (error) {
      res.render(this.rootModule + 'error/404', {})
    }
  }


}

export default AdminItemController;
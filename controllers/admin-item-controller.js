
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

  async changeStatusItem(req, res) {
    global.logger.info('AdminItemController.changeStatusItem');
    try {
      let { id } = req.params;

      let item = await this.db.Items.findOne({ where: { id } });

      if (!item) {
        return res.status(404).send({ message: 'Item not found' });
      }

      await this.db.Items.update({ isActive: !item.isActive }, { where: { id } });

      return res.status(200).send({ message: 'Item status changed', ok: true });

    } catch (error) {
      res.status(500).json({
        ok: false,
        message: 'Server error!',
      })
    }
  }

  async deleteItem(req, res) {
    global.logger.info('AdminItemController::deleteItem', JSON.stringify(req.params));

    try {
      let { id } = req.params;

      let item = await this.db.Items.findOne({ where: { id } });

      if (!item) {
        return res.status(404).send({ message: 'Item not found' });
      }

      await this.db.Items.destroy({ where: { id } });

      //delete image item from cloudinary
      await imageUtils.removeImageToCloud(item.image);

      return res.status(200).send({ message: 'Item deleted', ok: true });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: 'Server error!',
      })
    }
  }

  async createItem(req, res) {
    global.logger.info('AdminItemController::createItem');

    try {
      let categories = await this.db.Categories.findAll();

      categories = JSON.parse(JSON.stringify(categories));

      return res.render(this.rootModule + 'product/create', { categories });
    } catch (error) {
      return res.render(this.rootModule + 'error/404', {});
    }
  }
}

export default AdminItemController;
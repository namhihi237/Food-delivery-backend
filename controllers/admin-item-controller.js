
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
        titlePage: 'List of products'
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

      return res.render(this.rootModule + 'product/create', { categories, titlePage: 'Create product' });
    } catch (error) {
      return res.render(this.rootModule + 'error/404', {});
    }
  }

  async postCreateItem(req, res) {
    global.logger.info('AdminItemController::postCreateItem', JSON.stringify(req.body));

    try {
      let params = req.body;

      // check required params
      if (!params.name || !params.price || !params.description || !params.categoryId || !req.file.path) {
        return res.status(400).send({ message: 'Missing required params' });
      }

      // check if category exists
      let category = await this.db.Categories.findOne({ where: { id: params.categoryId } });

      if (!category) {
        return res.status(404).send({ message: 'Category not found' });
      }

      // upload image to cloudinary
      let image = await imageUtils.uploadImageAdmin(req.file.path);

      if (!image) {
        return res.status(400).send({ message: 'Image upload failed' });
      }

      // create item
      await this.db.Items.create({ ...params, image: image.url });

      res.status(200).send({ message: 'Item created', ok: true });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: 'Server error!',
      });
    }
  }

  async editItem(req, res) {
    global.logger.info('AdminItemController::editItem');

    try {
      let { id } = req.params;

      let item = await this.db.Items.findOne({ where: { id } });

      if (!item) {
        return res.render(this.rootModule + 'error/404', {
          message: 'Item not found'
        });
      }

      let categories = await this.db.Categories.findAll();
      categories = JSON.parse(JSON.stringify(categories));
      item = JSON.parse(JSON.stringify(item));

      return res.render(this.rootModule + 'product/edit', {
        item,
        categories,
        titlePage: 'Edit product'
      });


    } catch (error) {
      return res.render(this.rootModule + 'error/404', {
        message: 'Item not found'
      });
    }
  }

  async postEditItem(req, res) {
    global.logger.info('AdminItemController::postEditItem', JSON.stringify(req.body));

    try {
      let { id } = req.params;
      let params = req.body;

      // check required params
      if (!params.name || !params.price || !params.categoryId) {
        return res.status(400).send({ message: 'Missing required name, price, category' });
      }

      let item = await this.db.Items.findOne({ where: { id } });
      if (!item) {
        return res.status(404).send({ message: 'Item not found' });
      }

      // check if category exists
      let category = await this.db.Categories.findOne({ where: { id: params.categoryId } });

      if (!category) {
        return res.status(404).send({ message: 'Category not found' });
      }

      let image = item.image;
      if (req.file) {
        // upload image to cloudinary
        let upload = await imageUtils.uploadImageAdmin(req.file.path);

        if (!upload) {
          return res.status(400).send({ message: 'Image upload failed' });
        }

        image = upload.url;
      }

      // update item
      await this.db.Items.update({ ...params, image }, { where: { id } });

      // delete image item from cloudinary
      if (req.file) {
        await imageUtils.removeImageToCloud(item.image);
      }

      return res.status(200).send({ message: 'Item updated', ok: true });

    } catch (error) {
      global.logger.error('AdminItemController::postEditItem', error);
      return res.status(500).json({
        ok: false,
        message: 'Server error!',
      });
    }
  }

  async viewItem(req, res) {
    global.logger.info('AdminItemController::getItem', JSON.stringify(req.params));

    try {
      const { id } = req.params;

      let item = await this.db.Items.findOne({ where: { id } });

      if (!item) {
        return res.render(this.rootModule + 'error/404', {
          message: 'Item not found'
        });
      }

      item = JSON.parse(JSON.stringify(item));

      return res.render(this.rootModule + 'product/detail', {
        item,
        titlePage: 'Product detail'
      });


    } catch (error) {
      return res.render(this.rootModule + 'error/404', {
        message: 'Server error!'
      });
    }
  }
}

export default AdminItemController;
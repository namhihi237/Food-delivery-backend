import { imageUtils } from '../utils';
class AdminCategoryController {
  constructor(db) {
    this.db = db;
    this.rootModule = 'admin/modules/'
  }

  async renderCategory(req, res) {
    global.logger.info(`AdminCategoryController::renderCategory`, JSON.stringify(req.params));
    try {
      let categories = await this.db.Categories.findAll();

      categories = JSON.parse(JSON.stringify(categories));

      res.render(this.rootModule + 'category/list', {
        categories
      });

    } catch (error) {
      res.render(`${this.rootModule}error/404`);
    }
  }

  async changeStatusCategory(req, res) {
    global.logger.info(`AdminCategoryController::changeStatusCategory`, JSON.stringify(req.params));
    try {
      let category = await this.db.Categories.findOne({
        where: {
          id: req.params.id
        }
      });

      // category not found
      if (!category) {
        res.status(404).json({
          message: 'Category not found',
          ok: false
        });
      }

      category.status = !category.status;

      await category.save();

      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      res.render(`${this.rootModule}error/404`);
    }
  }

  async addCategory(req, res) {
    global.logger.info(`AdminCategoryController::addCategory`, JSON.stringify(req.body));
    try {
      let params = req.body;
      // check required params
      if (!params.name || !req.file) {
        console.log('Missing params');
        return;
      }
      const image = await imageUtils.uploadImageAdmin(req.file.path);
      if (!image) {
        return;
      }

      await this.db.Categories.create({
        name: params.name,
        image: image.url,
        status: true
      });

      let categories = await this.db.Categories.findAll();

      categories = JSON.parse(JSON.stringify(categories));

      res.render(this.rootModule + 'category/list', {
        categories
      });
    } catch (error) {
      global.logger.error(`AdminCategoryController::addCategory`, error);
      res.render(`${this.rootModule}error/404`);
    }
  }

}

export default AdminCategoryController;
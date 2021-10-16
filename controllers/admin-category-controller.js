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

}

export default AdminCategoryController;
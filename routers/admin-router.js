import { Router } from 'express';
import { AdminAuthenticationController, AdminDashboardController, AdminCategoryController, AdminItemController, AdminOrderController } from '../controllers';
import AdminMiddleware from '../middlewares/adminMiddleware';
import { upload } from "../utils";

export default ({ db }) => {
  // create new instance of router
  const router = Router();
  const adminAuthenticationController = new AdminAuthenticationController(db);
  const adminDashboardController = new AdminDashboardController(db);
  const adminCategoryController = new AdminCategoryController(db);
  const adminItemController = new AdminItemController(db);
  const adminOrderController = new AdminOrderController(db);

  const adminMiddleware = new AdminMiddleware(db);
  // authentication routes
  router.route('/login').get((req, res) => adminAuthenticationController.login(req, res));
  router.route('/login').post((req, res) => adminAuthenticationController.postLogin(req, res));
  router.route('/logout').get((req, res) => adminAuthenticationController.logout(req, res));

  // dashboard routes
  router.route('/dashboard').get((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), (req, res) => adminDashboardController.renderDashboard(req, res));

  // category routes
  router.route('/categories').get((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), (req, res) => adminCategoryController.renderCategory(req, res));
  router.route('/categories/:id/change-status').post((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), (req, res) => adminCategoryController.changeStatusCategory(req, res));
  router.route('/categories/add').post((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), upload.single('image'), (req, res) => adminCategoryController.addCategory(req, res));
  router.route('/categories/:id/delete').post((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), (req, res) => adminCategoryController.deleteCategory(req, res));
  router.route('/categories/:id/edit').get((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), upload.single('image'), (req, res) => adminCategoryController.editCategory(req, res));
  router.route('/categories/:id/edit').post((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), upload.single('image'), (req, res) => adminCategoryController.postEditCategory(req, res));


  // item routes
  router.route('/items').get((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), (req, res) => adminItemController.listItems(req, res));
  router.route('/items/:id/change-status').post((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), (req, res) => adminItemController.changeStatusItem(req, res));
  router.route('/items/:id/delete').post((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), (req, res) => adminItemController.deleteItem(req, res));
  router.route('/items/add').get((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), (req, res) => adminItemController.createItem(req, res));
  router.route('/items/add').post((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), upload.single('image'), (req, res) => adminItemController.postCreateItem(req, res));
  router.route('/items/:id/edit').get((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), upload.single('image'), (req, res) => adminItemController.editItem(req, res));
  router.route('/items/:id/edit').post((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), upload.single('image'), (req, res) => adminItemController.postEditItem(req, res));
  router.route('/items/:id').get((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), (req, res) => adminItemController.viewItem(req, res));


  // order routes
  router.route('/orders').get((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), (req, res) => adminOrderController.listOrders(req, res));


  return router;
}
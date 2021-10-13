import { Router } from 'express';
import { AdminAuthenticationController, AdminDashboardController } from '../controllers';
import AdminMiddleware from '../middlewares/adminMiddleware';

export default ({ db }) => {
  // create new instance of router
  const router = Router();
  const adminAuthenticationController = new AdminAuthenticationController(db);
  const adminDashboardController = new AdminDashboardController(db);
  const adminMiddleware = new AdminMiddleware(db);
  // authentication routes
  router.route('/login').get((req, res) => adminAuthenticationController.login(req, res));
  router.route('/login').post((req, res) => adminAuthenticationController.postLogin(req, res));


  // dashboard routes
  router.route('/dashboard').get((req, res, next) => adminMiddleware.isLoggedIn(req, res, next), (req, res) => adminDashboardController.renderDashboard(req, res));

  return router;
}
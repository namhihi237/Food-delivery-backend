import { Router } from 'express';
import { AuthenticationController } from '../controllers';

export default ({ db }) => {
  // create new instance of router
  const router = Router();
  const authenticationController = new AuthenticationController(db);

  // router
  router.route('/verify-email').get((req, res) => authenticationController.verifyAccount(req, res));

  return router;
}
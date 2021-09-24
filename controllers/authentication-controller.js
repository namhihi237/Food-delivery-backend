import { jwtUtils } from '../utils';

class AuthenticationController {
  constructor(db) {
    this.db = db;
  }

  async verifyAccount(req, res) {
    const token = req.query.token;
    try {
      global.logger.info('AuthenticationController::verifyAccount');

      if (!token) {
        return res.send("Missing token!")
      }

      const encodeToken = await jwtUtils.verify(token);
      const { id } = encodeToken.data;

      const user = await this.db.Users.findOne({ where: { id } });

      if (!user) {
        return res.send("Verify account failed!")
      }

      await this.db.Users.update({ isActive: true }, { where: { id } });

      res.send("User verified");

    } catch (error) {
      return res.send("Verify account failed!")
    }
  }
}

export default AuthenticationController;
import { bcryptUtils } from '../utils';

const FIELDS = ['username', 'role', 'isActive', 'id'];

class AdminAuthenticationController {
  constructor(db) {
    this.db = db;
    this.rootModule = 'admin/modules/'
  }

  login(req, res) {
    res.render(`${this.rootModule}auth/login`, { message: '' });
  }

  async postLogin(req, res) {
    global.logger.info('AdminAuthenticationController::postLogin', req.body);

    try {
      const { userName, password } = req.body;

      // check require username and password
      if (!userName || !password) {
        return res.render(`${this.rootModule}auth/login`, { message: 'Missing userName or password' });
      }

      const user = await this.db.Admins.findOne({ where: { userName } });

      logger.info('AdminAuthenticationController::postLogin', user, "user");

      if (!user) {
        return res.render(`${this.rootModule}auth/login`, { message: 'User not found' });
      }

      // check password
      const isPasswordValid = await bcryptUtils.comparePassword(password, user.password);

      if (!isPasswordValid) {
        return res.render(`${this.rootModule}auth/login`, { message: 'Invalid password' });
      }

      // check active
      if (!user.isActive) {
        return res.render(`${this.rootModule}auth/login`, { message: 'User is not active' });
      }

      // create session
      req.session.user = user;
      return res.redirect('/dashboard');

    } catch (error) {
      console.log(error);
    }
  }
}

export default AdminAuthenticationController;
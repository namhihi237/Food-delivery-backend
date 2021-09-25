import { bcryptUtils, emailUtils, jwtUtils } from '../../../utils';
import _ from 'lodash';

const authenticationMutation = {
  register: async (parent, args, context, info) => {
    global.logger.info('authenticationMutation::register' + JSON.stringify(args));
    const { email, fullName, password } = args;

    // check required fields
    if (!email || !fullName || !password) {
      throw new Error('Please provide an email, full name and password');
    }

    // check if user already exists
    const user = await context.db.Users.findOne({ where: { email } });
    if (user) {
      throw new Error('Email already exists');
    }

    const hashPassword = await bcryptUtils.hashPassword(password);

    // create user
    const newUser = await context.db.Users.create({
      email,
      fullName,
      password: hashPassword
    });

    // send email active account
    await emailUtils.sendEmailActive(newUser);

    return newUser;
  },

  login: async (parent, args, context, info) => {
    global.logger.info('authenticationMutation::login' + JSON.stringify(args));
    const { email, password } = args;

    // check required fields
    if (!email || !password) {
      throw new Error('Please provide an email and password');
    }

    // check if user exists
    const user = await context.db.Users.findOne({ where: { email } });
    if (!user) {
      throw new Error('Email does not exist');
    }

    // check if password is correct
    const isPasswordCorrect = await bcryptUtils.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect');
    }

    // check if user is active
    if (!user.isActive) {
      throw new Error('User is not active!');
    }

    // create token
    const token = await jwtUtils.encodeToken(_.pick(user, ['id', 'email']));

    return { token, user };
  }

}

export default authenticationMutation;
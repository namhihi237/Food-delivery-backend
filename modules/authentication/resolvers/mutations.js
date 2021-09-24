import { bcryptUtils, emailUtils } from '../../../utils';

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
    await emailUtils.sendEmailActive({ email });

    return newUser;
  }
}

export default authenticationMutation;
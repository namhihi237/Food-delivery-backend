import { bcryptUtils, emailUtils, jwtUtils, smsUtils } from '../../../utils';
import _ from 'lodash';
const LIMIT_TIME_SEND_SMS = 1 * 60 * 1000;

const authenticationMutation = {
  register: async (parent, args, context, info) => {
    global.logger.info('authenticationMutation::register' + JSON.stringify(args));
    let { email, fullName, password } = args;

    // check required fields
    if (!email || !fullName || !password) {
      throw new Error('Please provide an email, full name and password');
    }

    email = email.toLowerCase();

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
    let { email, password } = args;

    // check required fields
    if (!email || !password) {
      throw new Error('Please provide an email and password');
    }

    email = email.toLowerCase();

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

    // update lastLogin
    await context.db.Users.update({ lastLogin: new Date() }, { where: { id: user.id } });

    // create token
    const token = await jwtUtils.encodeToken(_.pick(user, ['id', 'email']));

    return { token, user };
  },

  getCodeActivePhoneNumber: async (parent, args, context, info) => {
    global.logger.info('authenticationMutation::getCodeActivePhoneNumber' + JSON.stringify(args));
    let { phoneNumber } = args;

    // check required fields
    if (!phoneNumber) {
      throw new Error('Please provide a phone number');
    }

    // convert phone number to Vietnam format
    phoneNumber = smsUtils.convertPhoneNumber(phoneNumber);

    // check if phone has been sent before
    const isSent = await context.db.CodeResets.findOne({ where: { phoneNumber } });

    if (isSent) {
      //  check 1 minutes send sms
      const timeDiff = new Date() - isSent.updatedAt;

      if (timeDiff < LIMIT_TIME_SEND_SMS) {
        throw new Error('We has send code, please wait 5 minutes to send sms again');
      } else {
        // send sms active phone number
        const code = await smsUtils.sendCodePhoneActive(phoneNumber);
        if (!code) {
          throw new Error('Send sms active phone number failed');
        }

        await context.db.CodeResets.update({ code }, { where: { phoneNumber } });
      }

    } else {
      // send sms active phone number
      const code = await smsUtils.sendCodePhoneActive(phoneNumber);
      if (!code) {
        throw new Error('Send sms active phone number failed');
      }

      await context.db.CodeResets.create({ phoneNumber, code });
    }

    return true;
  },

  activePhoneNumber: async (parent, args, context, info) => {
    global.logger.info('authenticationMutation::activePhoneNumber' + JSON.stringify(args));
    let { phoneNumber, code } = args;

    // check login
    if (!context.user) {
      throw new Error('Please login');
    }

    // check required fields
    if (!phoneNumber || !code) {
      throw new Error('Please provide a phone number and code');
    }

    // convert phone number to Vietnam format
    phoneNumber = smsUtils.convertPhoneNumber(phoneNumber);

    // check if phone has been sent before
    const isSent = await context.db.CodeResets.findOne({ where: { phoneNumber, code } });

    if (!isSent) {
      throw new Error('Code is incorrect');
    }

    // check code expired 1 minutes
    const timeDiff = new Date() - isSent.updatedAt;
    if (timeDiff > LIMIT_TIME_SEND_SMS) {
      throw new Error('Code is expired');
    }

    await context.db.CodeResets.destroy({ where: { phoneNumber, code } });

    await context.db.Users.update({ phoneNumber }, { where: { id: context.user.id } });

    return true;
  }

}

export default authenticationMutation;
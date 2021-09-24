import nodemailer from 'nodemailer';
import constants from '../config/constants';
import { envVariable } from '../configs';

class EmailUtils {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: envVariable.EMAIL,
        pass: envVariable.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(options) {
    const mailOptions = {
      from: constants.EMAIL_USER,
      to: options.email,
      subject: options.subject,
      text: options.text,
    };
    return this.transporter.sendMail(mailOptions);
  }

  async sendEmailActive(options) {
    options.subject = 'Active your account';
    return this.sendEmail(options);
  }
}

export default new EmailUtils();
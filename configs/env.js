require('dotenv').config();

export const envVariable = {
  PORT: process.env.PORT || 80,
  JWT_SECRET: process.env.JWT_SECRET || '123456',
  CLOUD_NAME: process.env.CLOUD_NAME || '',
  API_KEY_CLOUD: process.env.API_KEY_CLOUD || '',
  API_SECRET_CLOUD: process.env.API_SECRET_CLOUD || '',
  accountSid: process.env.TWILIO_ACCOUNT_SID || '',
  authToken: process.env.TWILIO_AUTH_TOKEN || '',
  FIREBASE_URL: process.env.FIREBASE_URL || '',
  CLIENT_ID: process.env.CLIENT_ID || '',
  DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:@localhost:3306/food-delivery',
  EMAIL: process.env.EMAIL || '',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '',
};

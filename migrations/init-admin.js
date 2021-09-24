import {hashPassword} from '../utils'

import models from '../models/index.js';

/**
 * Force initialize database. the old table will be replace with new structure
 */
models()
  .then(db => db.sequelize.transaction(async t => {

    let options = { raw: true, transaction: t };
    const password = await hashPassword(process.env.ADMIN_PASSWORD_SEED);
    return db.Admins.create({
      userName: 'admin',
      fullName: 'Admin',
      password,
      role: 'admin'
    }, options);
  }))
  .then(() => {
    console.log('Migrated init admins successful');
  })
  .catch(err => {
    console.log(`Can't migrate ${err.stack || JSON.stringify(err)}`);
  });

import Promise from 'bluebird';

class RedisUtils {
  
  exists(key) {
    return new Promise((resolve, reject) => {
      global.redisClient.exists(key, (err, result) => {
        if (err) {
          reject(err);
        }

        if (result) {
          resolve(true);
        }

        resolve(false);
      });
    });
  }

  /**
   * Delete a key
   *
   * @param {*} key
   * @returns
   * @memberof RedisHelper
   */
  del(key) {
    return new Promise((resolve, reject) => {
      global.redisClient.del(key, (err, result) => {
        if (err) {
          reject(err);
        }

        if (result) {
          resolve(true);
        }

        resolve(false);
      });
    });
  }

  /**
   * Get a key
   *
   * @param {*} key
   * @returns
   * @memberof RedisHelper
   */
  get(key) {
    return new Promise((resolve, reject) => {
      global.redisClient.get(key, (err, result) => {
        if (err) {
          reject(err);
        }

        if (result) {
          try {
            result = JSON.parse(result);
            resolve(result);
          } catch (error) {
            resolve(result);
          }
        }

        reject(err);
      });
    });
  }

  /**
   * Set new key
   *
   * @param {*} key
   * @param {*} value
   * @returns
   * @memberof RedisHelper
   */
  set(key, value) {
    return new Promise((resolve, reject) => {
      global.redisClient.set(key, value, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }


  /**
   * Get object
   *
   * @param {*} key
   * @returns
   * @memberof RedisHelper
   */
  hgetall(key) {
    return new Promise((resolve, reject) => {
      global.redisClient.hgetall(key, (err, result) => {
        if (err) {
          reject(err);
        }

        if (result) {
          resolve(result);
        }

        reject(err);
      });
    });
  }

  /**
   * Set object
   *
   * @param {*} key
   * @param {*} object
   * @returns
   * @memberof RedisHelper
   */
  hmset(key, object) {
    return new Promise((resolve, reject) => {
      global.redisClient.hmset(key, object, (err, result) => {
        if (err) {
          reject(err);
        }

        if (result) {
          resolve(result);
        }

        reject(err);
      });
    });
  }
}

export default new RedisUtils();

/**
 * Application Context that holds resources used through the system
 *
 * @author Nam Le
 */
import bluebird from 'bluebird';
import redis from 'redis';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class AppContext {
  redisClient;
  /**
   * @constructor
   */
  constructor() {
    this.redisClient = null;
    this.initialize();
  }

  initialize() {
    this.createRedisClient();
  }

  createRedisClient() {
    this.redisClient = redis.createClient();

    this.redisClient.on('error', (error) => {
      console.log(`Connection redis has problem -  ${error.stack}`);
    });
  }

  getRedisClient() {
    return this.redisClient;
  }

  destroy() {
    if (this.redisClient) {
      this.redisClient.quit();
    }
  }
}

export default AppContext;

import constants from '../configs/constants';

class RandomUtils {
  randomCode(length) {
    let code = '';
    for (let i = 0; i < length; i++) {
      code += constants.ALPHABET[Math.floor(Math.random() * constants.ALPHABET.length)];
    }
    return code;
  }
}

export default new RandomUtils();
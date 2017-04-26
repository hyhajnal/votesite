import crypto from 'crypto';

class CryptoHelp {
  
  static cipher(algorithm, key, buf){
    let encrypted = "";
    let cip = crypto.createCipher(algorithm, key);
    encrypted += cip.update(buf, 'binary', 'hex');
    encrypted += cip.final('hex');
    return encrypted;
  }

  static decipher(algorithm, key, encrypted){
    let decrypted = "";
    let decipher = crypto.createDecipher(algorithm, key);
    decrypted += decipher.update(encrypted, 'hex', 'binary');
    decrypted += decipher.final('binary');
    return decrypted;
  }

}

export default CryptoHelp;
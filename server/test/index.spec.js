import { expect } from 'chai';
import cryptoHelp from '../src/common/crypto_util';
describe('test util', () => {
  it('crypto!', async () => {
    const key = 'votesite';
    const need_encrypto = '123456';
    const rs1 = await cryptoHelp.cipher('aes-256-cbc', key, need_encrypto);
    console.log(rs1);
    const rs2 = await cryptoHelp.decipher('aes-256-cbc', key, rs1);
    expect(rs2).to.equal(need_encrypto);
  });
});
const chai = require('chai');
const app = require('../app');

const tools = require('../modules/tools')

var expect = chai.expect;

chai.should();

describe("tools.js テスト", () => {
  describe("translateStringToDate", () => {
    it("日付が正しく変換されること", () => {
      expect(tools.translateStringToDate('2020-01-01')).to.be.a(new Date(2020, 0, 1, 0, 0, 0));
    });
  });
});
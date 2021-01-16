const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const db = require('../models/index')
const { Op } = require('sequelize');

var expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe("signup Page", () => {

  // 前処理
  before(async () => {
    try {
      await db.User.destroy({
        where: {
          loginid: { [ Op.like ]: `roomid%` }
        }
      });
    } catch (e) {
      console.log(e);
      console.log('ユーザが削除されませんでした');
    }
  });

  // 後処理
  after(async () => {
    try {
      await db.User.destroy({
        where: {
          loginid: { [ Op.like ]: `roomid%` }
        }
      });
    } catch (e) {
      console.log(e);
      console.log('ユーザが削除されませんでした');
    }
  });


  describe("GET /room ", () => {
    
    // ログインしていない場合、ログイン画面に遷移する

  });
});
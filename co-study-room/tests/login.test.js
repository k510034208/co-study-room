const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const db = require('../models/index')
const { Op } = require('sequelize');

var expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe("Login Test", () => {

  // 前処理
  before(async () => {
    try {
      await db.User.create({
        loginid: 'loginid001',
        username: 'loginname001',
        password: 'loginpassword001',        
      });
    } catch (e) {
      console.log(e);
      console.log('ユーザが作成されませんでした');
    }
  });

  // 後処理
  after(async () => {
    try {
      await db.User.destroy({
        where: {
          loginid: { [ Op.like ]: `loginid%` }
        }
      });
    } catch (e) {
      console.log(e);
      console.log('ユーザが削除されませんでした');
    }
  });


  describe("GET /login", () => {
    // /loginへGETしたときのリダイレクト確認
    it('200OK', (done) => {
      chai.request(app)
        .get('/login')
        .end((err, res) => {
          expect(err).to.be.null; // エラーがないこと
          expect(res).to.have.status(200); //statusの指定
          expect(res.text).to.include('co-study-room © 2021'); //フッターの文字列を確認する          
          done();
        })
    });    
  })

  describe("POST /login ", () => {

    // ログイン成功
    it('ログイン成功', (done) => {
      chai.request(app)
        .post('/login')
        .send({
          login_id:"loginid001",
          password:"loginpassword001"
        })
        .end((err, res) => {
          expect(err).to.be.null; // エラーがないこと
          expect(res).to.have.status(200); //statusの指定
          expect(res.text).to.include('学習部屋を作成する'); //TOP画面内の特定の文字列があることを確認する
          done();
        })
    });
  });
});
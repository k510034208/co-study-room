const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const db = require('../models/index')
const { Op } = require('sequelize');

var expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe("signup Page", () => {

  describe("GET /signup ", () => {

    //TEST for GET Index Page
    it('200OK', (done) => {
      chai.request(app)
        .get('/signup')
        .end((err, res) => {
          expect(err).to.be.null; // エラーがないこと
          expect(res).to.have.status(200); //statusの指定
          done();
        })
    });

    it('フッターの表示', (done) => {
      chai.request(app)
        .get('/signup')
        .end((err, res) => {
          expect(res.text).to.include('co-study-room © 2021'); //フッターの文字列を確認する
          done();
        });
    });
    
  });

  describe('POST /signup', async () => {

    // 後処理
    after(async () => {
      try {
        await db.User.destroy({
          where: {
            loginid: { [ Op.like ]: `useraddtest%` }
          }
        });
      } catch (e) {
        console.log(e);
        console.log('ユーザが削除されませんでした');
      }
    });
    
    // status確認
    it('200OK', (done) => {
      chai.request(app)
        .post('/signup')
        .send({
          login_id: 'useraddtest001',
          user_name: 'ユーザ追加001',
          password: 'password'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });

    // ユーザの作成
    it('ユーザが作成できること', (done) => {
      
      chai.request(app)
        .post('/signup')
        .send({
          login_id: 'useraddtest002',
          user_name: 'ユーザ追加002',
          password: 'password'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.text).to.include('ユーザが作成されました');
          done();
        });
    });

    // formのバリデーションチェック
    it('login_id に半角英数字以外が含まれる場合', (done) => {
  
      chai.request(app)
        .post('/signup')
        .send({
          login_id: 'useraddtest００４４',
          user_name: 'ユーザ追加004',
          password: 'password'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.text).to.include('Login IDは半角英数字で登録してください。');
          done();
        });
    });

    // formのバリデーションチェック
    it('login_id が32文字以上の場合', (done) => {

      chai.request(app)
        .post('/signup')
        .send({
          login_id: 'useraddtest2345678901234567890123',
          user_name: 'ユーザ追加002',
          password: 'password'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.text).to.include('Login IDは32文字以内で登録してください。');
          done();
        });
    });
    
  });
});
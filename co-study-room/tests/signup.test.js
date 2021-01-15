const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

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
        })
    })
    
  });
});
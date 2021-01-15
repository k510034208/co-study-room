const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

var expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe("Index Page", () => {

  describe("GET / ", () => {
    
    //TEST for GET Index Page
    it('should return 200 OK', (done) => {

      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null; // エラーがないこと
          expect(res).to.have.status(200); //statusの指定
          done();
        })
    });

  });

});

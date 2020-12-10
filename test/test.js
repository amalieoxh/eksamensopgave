
var server = require('../backend/Server/API')
var chai = require('chai');
var chaiHTTP = require('chai-http');
//assertion style
chai.should()
chai.use(chaiHTTP);
var expect = require('chai').expect;

describe('API', function (){
    it('It should post a new like', (done) => {
        let like = {
            username: "Erik",
            likedUser: "Ida",
        }
        chai.request(server)
        .post('/interMatch')
        .send(like)
        .end((err,response)=> {
            response.should.have.status(200);
            response.should.be.a('object');
            expect("Erik").to.be.a('string');
            expect({ username: 'Ida' }).to.be.an('object');

            done()
        });
    });
});

describe('API', function (){
    it('It should post a new dislike', (done) => {
        let dislike = {
            username: "Ida",
            disLikedUser: "Erik",
        }
        chai.request(server)
        .post('/interMatchDis')
        .send(dislike)
        .end((err,response)=> {
            response.should.have.status(200);
            response.should.be.a('object');
            expect("Ida").to.be.a('string');
            expect({ username: 'Erik' }).to.be.an('object');
            done()
        });
    });
});











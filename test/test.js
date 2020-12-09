

var chai = require('chai');
var chaiHTTP = require('chai-http');
const { response } = require('express');
var API = require('../backend/Server/API')

//assertion style
chai.should()

chai.use(chaiHTTP);

describe('API()', function (){
    it('It should post a new like'), (done) => {
        const user = {
            username: "Erik",
            likedUser: "Ida",
        }
        chai.request(API)
        .post('/interMatch')
        .send(user)
        .end((err,response)=> {
            response.should.have.property('username').eq("Erik");
            response.should.have.property('likedUser').eq("Ida");
            //response.should.be.a('object');
            done()
        });
    };
});


describe('API()', function (){
    it('It should edit profil'), (done) => {
        chai.request(API)
        .put('/editProfile/:username')
        .end((err, response) => {
            response.should.have.status(200);
            //response.should.be.a('array');
            response.body.should.have.property('username')
            done();

        });
    };
});



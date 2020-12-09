
var server = require('../backend/Server/API')
var chai = require('chai');
var chaiHTTP = require('chai-http');

//assertion style
chai.should()
chai.use(chaiHTTP);



describe('API', function (){
    it('It should post a new like', (done) => {
        const user = {
            username: "Erik",
            likedUser: "Ida",
        }
        chai.request(server)
        .post('/interMatch')
        .send(user)
        .end((err,response)=> {
            response.should.have.status(200);
            response.should.be.a('object');
            done()
        });
    });
});











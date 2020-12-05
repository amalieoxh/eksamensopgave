var expect = require('chai').expect;
var pow = require('../pow')

describe('matchFunction()', function (){
    it('should return the matches'), function(){
        //1. Arange
        var x = 2;
        var n = 3;
        var power1 = 2**3;

        //2. act
        var power2 = pow(x,n);

        //3. assert
        expect(power1).to.be.equal(power2);


    };
});
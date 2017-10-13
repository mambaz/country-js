'use strict';

var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    n = require('../index.js'),
    countries = [
        'USA',
        'SG',
        'IN',
        'france',
        'Fr'
    ];



describe('##### Countries #####', function() {

    it ('Filter by input value', function () {

        countries.forEach (function (txt) {
            var result = n.search(txt);
            // console.log(result);
            result.should.be.a('array');
        });
    });

   

});

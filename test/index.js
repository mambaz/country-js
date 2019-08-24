'use strict';
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const n = require('../index.js');
const countries = [
        'USA',
        'SG',
        'IN',
        'france',
        'Fr'
    ];

describe('##### Countries #####', function() {
    it ('Filter by input value', function () {
        countries.forEach (function (txt) {
            const result = n.search(txt);
            // console.log(result);
            result.should.be.a('array');
        });
    });
});

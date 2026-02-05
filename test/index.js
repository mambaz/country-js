'use strict';
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const n = require('../index.js');

describe('##### Country-JS Test Suite #####', function() {

    describe('SEARCH FUNCTION', function() {

        it('should search by country code (uppercase)', function () {
            const result = n.search('US');
            result.should.be.a('array');
            result.length.should.be.greaterThan(0);
            result[0].code.should.equal('US');
        });

        it('should search by country code (lowercase)', function () {
            const result = n.search('sg');
            result.should.be.a('array');
            result.length.should.be.greaterThan(0);
            result[0].code.should.equal('SG');
        });

        it('should search by country name (uppercase)', function () {
            const result = n.search('AUSTRIA');
            result.should.be.a('array');
            result.length.should.be.greaterThan(0);
            result[0].name.should.equal('AUSTRIA');
        });

        it('should search by country name (lowercase)', function () {
            const result = n.search('france');
            result.should.be.a('array');
            result.length.should.be.greaterThan(0);
            result[0].name.should.equal('FRANCE');
        });

        it('should search by currency code', function () {
            const result = n.search('EUR');
            result.should.be.a('array');
            result.length.should.be.greaterThan(0);
            result.forEach(country => {
                (country.currency.currencyCode === 'EUR').should.be.true;
            });
        });

        it('should search by currency symbol', function () {
            const result = n.search('€');
            result.should.be.a('array');
            result.length.should.be.greaterThan(0);
            result.forEach(country => {
                (country.currency.currencySymbol === '€').should.be.true;
            });
        });

        it('should search by capital city', function () {
            const result = n.search('PARIS');
            result.should.be.a('array');
            result.length.should.be.greaterThan(0);
            result[0].capital.should.equal('PARIS');
        });

        it('should search by phone code', function () {
            const result = n.search('1');
            result.should.be.a('array');
            result.length.should.be.greaterThan(0);
        });

        it('should return empty array for no match', function () {
            const result = n.search('NONEXISTENT');
            result.should.be.a('array');
            result.length.should.equal(0);
        });

        it('should return empty array for null input', function () {
            const result = n.search(null);
            result.should.be.a('array');
            result.length.should.equal(0);
        });

        it('should return empty array for undefined input', function () {
            const result = n.search(undefined);
            result.should.be.a('array');
            result.length.should.equal(0);
        });

        it('should return empty array for empty string', function () {
            const result = n.search('');
            result.should.be.a('array');
            result.length.should.equal(0);
        });

        it('should return empty array for whitespace only', function () {
            const result = n.search('   ');
            result.should.be.a('array');
            result.length.should.equal(0);
        });

        it('should throw TypeError for non-string input (number)', function () {
            expect(() => n.search(123)).to.throw(TypeError);
        });

        it('should throw TypeError for non-string input (object)', function () {
            expect(() => n.search({code: 'US'})).to.throw(TypeError);
        });

        it('should throw TypeError for non-string input (array)', function () {
            expect(() => n.search(['US'])).to.throw(TypeError);
        });

        it('should prioritize exact matches over partial matches', function () {
            const result = n.search('US');
            // Exact match should be first
            result[0].code.should.equal('US');
        });

        it('should not return duplicate results', function () {
            const result = n.search('EURO');
            const seen = new Set();
            result.forEach(country => {
                const key = country.code;
                seen.has(key).should.be.false;
                seen.add(key);
            });
        });
    });

    describe('GETBYCODE FUNCTION', function() {

        it('should get country by code (uppercase)', function () {
            const result = n.getByCode('US');
            should.exist(result);
            result.code.should.equal('US');
            result.should.have.property('name');
            result.should.have.property('currency');
            result.should.have.property('capital');
        });

        it('should get country by code (lowercase)', function () {
            const result = n.getByCode('sg');
            should.exist(result);
            result.code.should.equal('SG');
        });

        it('should return null for invalid code', function () {
            const result = n.getByCode('XX');
            should.not.exist(result);
        });

        it('should return null for null input', function () {
            const result = n.getByCode(null);
            should.not.exist(result);
        });

        it('should return null for empty string', function () {
            const result = n.getByCode('');
            should.not.exist(result);
        });

        it('should throw TypeError for non-string input', function () {
            expect(() => n.getByCode(123)).to.throw(TypeError);
        });
    });

    describe('GETBYNAME FUNCTION', function() {

        it('should get country by name (uppercase)', function () {
            const result = n.getByName('AUSTRIA');
            should.exist(result);
            result.name.should.equal('AUSTRIA');
            result.should.have.property('code');
        });

        it('should get country by name (lowercase)', function () {
            const result = n.getByName('france');
            should.exist(result);
            result.name.should.equal('FRANCE');
        });

        it('should return null for invalid name', function () {
            const result = n.getByName('INVALIDCOUNTRY');
            should.not.exist(result);
        });

        it('should return null for null input', function () {
            const result = n.getByName(null);
            should.not.exist(result);
        });

        it('should throw TypeError for non-string input', function () {
            expect(() => n.getByName(123)).to.throw(TypeError);
        });
    });

    describe('GETALL FUNCTION', function() {

        it('should return all countries as array', function () {
            const result = n.getAll();
            result.should.be.a('array');
            result.length.should.be.greaterThan(0);
        });

        it('should return countries with expected structure', function () {
            const result = n.getAll();
            result.forEach(country => {
                country.should.have.property('code');
                country.should.have.property('name');
                country.should.have.property('currency');
                country.should.have.property('geo');
                country.should.have.property('capital');
                country.should.have.property('phone');
            });
        });
    });

    describe('COUNT FUNCTION', function() {

        it('should return total count of countries', function () {
            const result = n.count();
            result.should.be.a('number');
            result.should.be.greaterThan(0);
        });

        it('should return correct count matching getAll length', function () {
            const count = n.count();
            const all = n.getAll();
            count.should.equal(all.length);
        });
    });

    describe('DATA INTEGRITY', function() {

        it('should have unique country codes', function () {
            const all = n.getAll();
            const codes = all.map(c => c.code);
            const uniqueCodes = new Set(codes);
            codes.length.should.equal(uniqueCodes.size);
        });

        it('should have valid currency structure', function () {
            const all = n.getAll();
            all.forEach(country => {
                country.currency.should.have.property('currencyName');
                country.currency.should.have.property('currencyCode');
                country.currency.should.have.property('currencySymbol');
            });
        });

        it('should have valid geo coordinates', function () {
            const all = n.getAll();
            all.forEach(country => {
                country.geo.should.have.property('latitude');
                country.geo.should.have.property('longitude');
                country.geo.latitude.should.be.a('number');
                country.geo.longitude.should.be.a('number');
                country.geo.latitude.should.be.within(-90, 90);
                country.geo.longitude.should.be.within(-180, 180);
            });
        });
    });
});

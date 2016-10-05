var assert = require('assert');
var request = require('request');
var s = require('string');
var cheerio = require('cheerio');
var expect = require('chai').expect;
var baseUrl = 'http://localhost:3000';
process.env.NODE_ENV = 'test';

describe('Home page', function () {
	it('should have agrade as title', function (done) {
		request(baseUrl, function (error, response, body) {
			expect(error).to.be.not.ok;
			expect(response).to.be.not.a('undefined');
			expect(response.statusCode).to.be.equal(200);

			var $ = cheerio.load(body);
			var footerText = $('title').html();
			expect(s(footerText).contains('Agrade')).to.be.ok;
			done();
		});
	});
});

/* eslint no-console: 0 */

var uao = require("../index.js"),
	{describe, it} = require("mocha"),
    unicode = "一小段中文測試♥一小段中文测试♥中国の短いテスト♥",
	big5 = "\xa4\x40\xa4\x70\xac\x71\xa4\xa4\xa4\xe5\xb4\xfa\xb8\xd5\x9d\xde\xa4\x40\xa4\x70\xac\x71\xa4\xa4\xa4\xe5\x84\xf2\x86\x49\x9d\xde\xa4\xa4\x83\xf6\xc7\x55\xb5\x75\xc6\xea\xc7\xc2\xc7\xb5\xc7\xc4\x9d\xde",
	assert = require("assert");
	
describe("uao", () => {
	it("async encode", () => {
		return uao.encode(unicode).then(text => {
			assert.equal(text, big5);
		});
	});
	
	it("sync encode", () => {
		assert.equal(uao.encodeSync(unicode), big5);
	});
	
	it("async decode", () => {
		return uao.decode(big5).then(text => {
			assert.equal(text, unicode);
		});
	});
	
	it("sync decode", () => {
		assert.equal(uao.decodeSync(big5), unicode);
	});
	
	it("encode error", () => {
		assert.throws(() => {
			uao.encodeSync("\x81");
		});
	});
	
	it("encode error with replacement", () => {
		assert.equal(uao.encodeSync("\x81", "?"), "?");
	});
});

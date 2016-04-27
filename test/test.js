/* eslint no-console: 0 */

var uao = require("../index.js"),

    text = "一小段中文測試♥一小段中文测试♥中国の短いテスト♥";

console.log("encode = decode^-1");
console.assert(text == uao.decode(uao.encode(text)));

console.log("encode non encodable character will throw an error");
try {
    uao.encode("\x81");
    console.assert(false);
} catch (err) {
    console.log("throwed: " + err);
}

console.log("encode accept a replacement character");
console.assert(uao.encode("\x81", "?") == "?");

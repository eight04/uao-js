// encode string to bytes
function encode(string, error) {
	var table = require("./table/u2b.json"),
		i = 0, result = "";
	for (; i < string.length; i++) {
		if (table[string[i]]) {
			result += table[string[i]];
		} else if (string.charCodeAt(i) <= 0x80) {
			result += string[i];
		} else if (error != undefined) {
			result += error;
		} else {
			throw "Can't enocode character " + JSON.stringify(string[i]) + " at index " + i;
		}
	}
	return result;
}

// decode bytes to string
function decode(bytes) {
	var table = require("./table/b2u.json"),
		i = 0, result = "";
	for (; i < bytes.length - 1; i++) {
		if (bytes.charCodeAt(i) > 0x80) {
			result += table[bytes[i] + bytes[i + 1]];
			i++;
		} else {
			result += bytes[i];
		}
	}
	if (i < bytes.length) {
		result += bytes[i];
	}
	return result;
}

module.exports = {
	encode: encode,
	decode: decode
};

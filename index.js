function encode(table, string, error) {
	var i = 0, result = "";
	for (; i < string.length; i++) {
		if (table[string[i]]) {
			result += table[string[i]];
		} else if (string.charCodeAt(i) <= 0x80) {
			result += string[i];
		} else if (error != undefined) {
			result += error;
		} else {
			throw new Error(`Can't encode character ${JSON.stringify(string[i])} at index ${i}`);
		}
	}
	return result;
}

function decode(table, bytes) {
	var i = 0, result = "";
	for (; i < bytes.length - 1; i++) {
		if (bytes.charCodeAt(i) > 0x80 && table[bytes[i] + bytes[i + 1]]) {
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

var tableCache = {},

	createEncodeTable = () => Promise.resolve(require("./table/u2b.json")),
	createDecodeTable = () => Promise.resolve(require("./table/b2u.json")),
	createEncodeTableSync = () => require("./table/u2b.json"),
	createDecodeTableSync = () => require("./table/b2u.json");

module.exports = {
	encode(text, error, createTable = createEncodeTable) {
		if (!tableCache.u2b) {
			return createTable().then(table => {
				tableCache.u2b = table;
				return encode(table, text, error);
			});
		}
		return Promise.resolve(encode(tableCache.u2b, text, error));
	},
	decode(text, createTable = createDecodeTable) {
		if (!tableCache.b2u) {
			return createTable().then(table => {
				tableCache.b2u = table;
				return decode(table, text);
			});
		}
		return Promise.resolve(encode(tableCache.b2u, text));
	},
	encodeSync(text, error, createTable = createEncodeTableSync) {
		if (!tableCache.u2b) {
			tableCache.u2b = createTable();
		}
		return encode(tableCache.u2b, text, error);
	},
	decodeSync(text, createTable = createDecodeTableSync) {
		if (!tableCache.b2u) {
			tableCache.b2u = createTable();
		}
		return decode(tableCache.b2u, text);
	}
};

var fs = require("fs");

function hex2num(hex) {
	return parseInt(hex);
}

function createByte(code) {
	var high = Math.floor(code / 0x100),
		low = code % 0x100;
	return String.fromCharCode(high, low);
}

fs.readFile("src/uao250-u2b.txt", "utf-8", function(err, data) {
	if (err) {
		throw err;
	}
	var i = 0, j, line, table = {};
	while (i < data.length) {
		j = data.indexOf("\n", i);
		if (j < 0) {
			j = data.length;
		}
		if (data[i] != "#") {
			// extract line
			line = data.substring(i, j).trim();
			
			if (line) {
				var t = line.split(" ").map(hex2num);
				var big5 = createByte(t[0]), unicode = String.fromCharCode(t[1]);
				
				if (t[0] != 65533) {	// skip replacement character
					table[unicode] = big5;
				}
			}
		}
		i = j + 1;
	}
	
	fs.writeFile("table/u2b.json", JSON.stringify(table), "utf-8");
});

fs.readFile("src/uao250-b2u.txt", "utf-8", function(err, data) {
	if (err) {
		throw err;
	}
	var i = 0, j, line, table = {};
	while (i < data.length) {
		j = data.indexOf("\n", i);
		if (j < 0) {
			j = data.length;
		}
		if (data[i] != "#") {
			// extract line
			line = data.substring(i, j).trim();
			
			if (line) {
				var t = line.split(" ").map(hex2num);
				var big5 = createByte(t[0]), unicode = String.fromCharCode(t[1]);
				table[big5] = unicode;
			}
		}
		i = j + 1;
	}
	
	fs.writeFile("table/b2u.json", JSON.stringify(table), "utf-8");
});
